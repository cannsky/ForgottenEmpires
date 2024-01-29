import { Game, HEIGHT, MyMerkleWitness, UserAccount } from './Game';
import { Mina, PrivateKey, AccountUpdate, MerkleTree, UInt32 } from 'o1js';

/*
 * This file specifies how to test the `Add` example smart contract. It is safe to delete this file and replace
 * with your own tests.
 *
 * See https://docs.minaprotocol.com/zkapps for more info.
 */

let proofsEnabled = false;

describe('Game Contract', () => {
  let deployer: PrivateKey
  let userOne: PrivateKey
  let userTwo: PrivateKey
  let zkapp: PrivateKey
  let game: Game

  // Create an empty merkle tree.
  const tree = new MerkleTree(HEIGHT)

  beforeAll(async () => {
    if (proofsEnabled) await Game.compile();

    const Local = Mina.LocalBlockchain({ proofsEnabled })
    Mina.setActiveInstance(Local)

    deployer = Local.testAccounts[0].privateKey
    userOne = Local.testAccounts[1].privateKey
    userTwo = Local.testAccounts[2].privateKey
    zkapp = PrivateKey.random()
    game = new Game(zkapp.toPublicKey())
  });

  it('Can deploy the Game contract!', async () => {
    const txn = await Mina.transaction(deployer.toPublicKey(), () => {
      AccountUpdate.fundNewAccount(deployer.toPublicKey());
      game.deploy();
    });

    await txn.prove();

    // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
    await txn.sign([deployer, zkapp]).send();

    expect(tree.getRoot()).toEqual(game.root.get())
  });

  it('Can create new user accounts while buying potions!', async () => {
    let accountOfUserOne: UserAccount = new UserAccount({
      owner: userOne.toPublicKey(),
      potionCount: UInt32.from(0),
    })

    const pathForUserOne = new MyMerkleWitness(tree.getWitness(1n))

    const txForUserOne = await Mina.transaction(userOne.toPublicKey(), () => {
      game.buyPotion(pathForUserOne, accountOfUserOne)
    })

    await txForUserOne.prove()

    await txForUserOne.sign([userOne]).send()

    accountOfUserOne = new UserAccount({
      owner: userOne.toPublicKey(),
      potionCount: UInt32.from(1),
    })

    expect(pathForUserOne.calculateRoot(accountOfUserOne.hash())).toEqual(game.root.get())


    tree.setLeaf(1n, accountOfUserOne.hash())


    let accountOfUserTwo: UserAccount = new UserAccount({
      owner: userTwo.toPublicKey(),
      potionCount: UInt32.from(0),
    })

    const pathForUserTwo = new MyMerkleWitness(tree.getWitness(2n))

    const txForUserTwo = await Mina.transaction(userTwo.toPublicKey(), () => {
      game.buyPotion(pathForUserTwo, accountOfUserTwo)
    })

    await txForUserTwo.prove()

    await txForUserTwo.sign([userTwo]).send()


    accountOfUserTwo = new UserAccount({
      owner: userTwo.toPublicKey(),
      potionCount: UInt32.from(1),
    })

    expect(pathForUserTwo.calculateRoot(accountOfUserTwo.hash())).toEqual(game.root.get())

    tree.setLeaf(2n, accountOfUserTwo.hash())
  });

  it('Can use potions.', async () => {
    let account: UserAccount = new UserAccount({
      owner: userOne.toPublicKey(),
      potionCount: UInt32.from(1),
    })

    const path = new MyMerkleWitness(tree.getWitness(1n))

    const tx = await Mina.transaction(userOne.toPublicKey(), () => {
      game.usePotion(path, account)
    })

    await tx.prove()

    await tx.sign([userOne]).send()

    account = new UserAccount({
      owner: userOne.toPublicKey(),
      potionCount: UInt32.from(0),
    })

    expect(path.calculateRoot(account.hash())).toEqual(game.root.get())
  })
});
