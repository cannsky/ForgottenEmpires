import { getMerkleWitnessAndPotionCount } from './api'


export async function createBuyPotionTx(userAddress: string): Promise<string> {
    const { merkleWitness, userAccount } = await getMerkleWitnessAndPotionCount(userAddress)

    const { o1js, Game, CONTRACT_ADDR } = await import('contracts')
    o1js.Mina.setActiveInstance(o1js.Mina.Network('https://api.minascan.io/node/berkeley/v1/graphql'))

    const sender = o1js.PublicKey.fromBase58(userAddress)
    const contractAddr = o1js.PublicKey.fromBase58(CONTRACT_ADDR)

    const tx = await o1js.Mina.transaction(sender, () => {
        const game = new Game(contractAddr)
        game.buyPotion(merkleWitness, userAccount)
    })

    await tx.prove()

    return tx.toJSON()
}


export async function createUsePotionTx(userAddress: string): Promise<string> {
    const { merkleWitness, userAccount } = await getMerkleWitnessAndPotionCount(userAddress)

    const { o1js, Game, CONTRACT_ADDR } = await import('contracts')
    o1js.Mina.setActiveInstance(o1js.Mina.Network('https://api.minascan.io/node/berkeley/v1/graphql'))

    const sender = o1js.PublicKey.fromBase58(userAddress)
    const contractAddr = o1js.PublicKey.fromBase58(CONTRACT_ADDR)

    const tx = await o1js.Mina.transaction(sender, () => {
        const game = new Game(contractAddr)
        game.usePotion(merkleWitness, userAccount)
    })

    await tx.prove()

    return tx.toJSON()
}

export async function sendTransaction(txAsJson: string) {
    if (!window.mina) throw '`window.mina` object is not found'

    const { hash } = await window.mina.sendTransaction({
        transaction: txAsJson,
        feePayer: {
            fee: 0.1,
            memo: 'zkGame'
        }
    })

    console.log(`https://berkeley.minaexplorer.com/transaction/${hash}`)
}

export async function getAddress() {
    if (!window.mina) throw '`window.mina` object is not found'

    const addresses = await window.mina.requestAccounts()

    if (!addresses[0]) throw 'Auro Wallet address is not found'

    return addresses[0]
}