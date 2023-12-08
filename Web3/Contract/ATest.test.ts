import { CONTRACT_ADDR, Game, HEIGHT, MyMerkleWitness, UserAccount } from './Game';
import { Field, Mina, PrivateKey, PublicKey, AccountUpdate, MerkleTree, UInt32 } from 'o1js';

/*
 * This file specifies how to test the `Add` example smart contract. It is safe to delete this file and replace
 * with your own tests.
 *
 * See https://docs.minaprotocol.com/zkapps for more info.
 */

let proofsEnabled = false;

describe('Game Contract', () => {


    it('Can deploy the Game contract!', async () => {

        const network = Mina.Network({
            mina: "https://proxy.berkeley.minaexplorer.com/graphql",
            archive: "https://archive.berkeley.minaexplorer.com",
        })
        Mina.setActiveInstance(network)


        // await Game.compile()
        const game = new Game(PublicKey.fromBase58(CONTRACT_ADDR))

        // const merkleTree = new MerkleTree(HEIGHT)

        // const signer = PrivateKey.fromBase58('EKF2L6Z5xGqVVopzaiFSXujtRWaCrrddtHb1NqtPjDLmHb4Sx6iy')


        // const userAccount = new UserAccount({
        //     owner: signer.toPublicKey(),
        //     potionCount: UInt32.from(0)
        // })
        // const path = new MyMerkleWitness(merkleTree.getWitness(0n))

        // const tx = await Mina.transaction(signer.toPublicKey(), () => {
        //     game.buyPotion(path, userAccount)
        // })

        // await tx.prove()

        // console.log(tx.toJSON())

        console.log(parseInt((await game.fetchEvents(UInt32.from(0))).at(0)?.blockHeight.toString() as any))
    });
});
