import { error } from 'console'
import { MyMerkleWitness, o1js, UserAccount } from 'contracts'
import { readFileSync } from 'fs'
import { writeFile } from 'fs/promises'
import { gameContract } from '.'


export class Storage {
    tree: o1js.MerkleTree
    users: Array<{
        publicKey: string
        potionCount: number
    }>
    lastBlockFetched: number

    constructor() {
        try {
            const fileContent = readFileSync('./storage.json', 'utf8')
            const { users, lastBlockFetched } = JSON.parse(fileContent)
            this.tree = new o1js.MerkleTree(10)
            this.users = users

            this.users.forEach((user, i) => {
                const accountHash = new UserAccount({
                    owner: o1js.PublicKey.fromBase58(user.publicKey),
                    potionCount: o1js.UInt32.from(user.potionCount)
                }).hash();

                this.tree.setLeaf(BigInt(i), accountHash)
            })
            this.lastBlockFetched = lastBlockFetched
            console.log('storage restored')
        } catch (error) {
            this.tree = new o1js.MerkleTree(10)
            this.users = []
            this.lastBlockFetched = 0
            console.log('storage not restored')
        }


        setInterval(() => this.persistData(), 60000)
        setInterval(() => this.fetchEvents(), 30000)
    }

    async persistData() {
        try {
            await writeFile('./storage.json', JSON.stringify({
                users: this.users,
                lastBlockFetched: this.lastBlockFetched,
            }), 'utf8')
            console.log('state persisted')
        } catch (error) {
            console.error('could not persist data')
            console.error(error)
        }
    }

    async fetchEvents() {
        try {
            const events = await gameContract.fetchEvents(o1js.UInt32.from(this.lastBlockFetched))
            if (events.length === 0) return
            const possibleLastBlock = events.sort((a, b) => a.blockHeight.greaterThan(b.blockHeight).toBoolean() ? 1 : -1).at(-1)?.blockHeight.toString()
            this.lastBlockFetched = possibleLastBlock ? (parseInt(possibleLastBlock) + 1) : this.lastBlockFetched
            events.forEach(({ event, type }) => {
                // type can be either 'buy-potion' or 'use-potion'
                const publicKey = o1js.PublicKey.from(event.data as any).toBase58()
                if (type === 'buy-potion') {
                    this.addPotion(publicKey)
                } else if (type === 'use-potion') {
                    this.removePotion(publicKey)
                }
            })
            console.log('events fetched')
        } catch (error) {
            console.error('could not fetch events')
            console.error(error)
        }
    }

    addPotion(publicKey: string) {
        console.log(publicKey)
        const possibleIndex = this.users.findIndex(user => user.publicKey === publicKey)
        const userIndex = possibleIndex === -1 ? this.users.length : possibleIndex
        if (possibleIndex === -1) {
            this.users[this.users.length] = { potionCount: 0, publicKey }
        }
        console.log(this.users[userIndex])

        this.users[userIndex].potionCount += 1

        this.tree.setLeaf(BigInt(userIndex), new UserAccount({
            owner: o1js.PublicKey.fromBase58(publicKey),
            potionCount: o1js.UInt32.from(this.users[userIndex].potionCount)
        }).hash())
    }


    removePotion(publicKey: string) {
        const possibleIndex = this.users.findIndex(user => user.publicKey === publicKey)
        if (possibleIndex === -1) {
            this.users[this.users.length] = { potionCount: 0, publicKey }
        }

        this.users[possibleIndex].potionCount -= 1

        this.tree.setLeaf(BigInt(possibleIndex), new UserAccount({
            owner: o1js.PublicKey.fromBase58(publicKey),
            potionCount: o1js.UInt32.from(this.users[possibleIndex].potionCount)
        }).hash())
    }

    getMerkleWitnessAndPotionCount(publicKey: string) {
        try {
            const possibleIndex = this.users.findIndex(user => user.publicKey === publicKey)

            const userIndex = possibleIndex === -1 ? this.users.length : possibleIndex
            const { potionCount } = possibleIndex === -1 ? { potionCount: 0 } : this.users[userIndex]

            const merkleWitness = new MyMerkleWitness(this.tree.getWitness(BigInt(userIndex))).toJSON() as Object

            return { merkleWitness, potionCount }
        } catch (error) {
            return null
        }
    }
}