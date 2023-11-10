export async function getMerkleWitnessAndPotionCount(userAddress: string) {
    const res = await fetch('https://forgottenempires.network/get-merkle-witness-and-potion-count', {
        method: 'POST',
        body: JSON.stringify(userAddress)
    })

    if (!res.ok) throw new Error('`/get-merkle-witness-and-potion-count` request is mistaken')

    const { merkleWitnessAsJson, potionCount } = await res.json()

    if (typeof merkleWitnessAsJson !== 'string' || typeof potionCount !== 'number') throw new Error('`/get-merkle-witness-and-potion-count` response is mistaken')

    const { MyMerkleWitness, UserAccount, o1js } = await import('contracts')

    const merkleWitness = MyMerkleWitness.fromObject(JSON.parse(merkleWitnessAsJson))

    const userAccount = new UserAccount({
        owner: o1js.PublicKey.fromBase58(userAddress),
        potionCount: o1js.UInt32.from(potionCount)
    })

    return {
        merkleWitness,
        userAccount
    }
}