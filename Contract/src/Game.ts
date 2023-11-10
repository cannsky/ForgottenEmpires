import { Field, SmartContract, state, State, method, Struct, UInt32, MerkleTree, MerkleWitness, Poseidon, PublicKey, Provable, Bool } from 'o1js';

/**
 * # Contract Address
 * The address of the Game contract.
 */
export const CONTRACT_ADDR = 'B62qkBPYVpBF7qVs52QwytKDHwvxqCJS48sM9rUJd9vFvm2YNz5AvhJ'

/**
 * # Merkle Tree Height
 * The height of the merkle tree that is used by the Game contract.
 */
export const HEIGHT = 10

/**
 * # User Account
 * A user account on the smart contract.
 */
export class UserAccount extends Struct({
  potionCount: UInt32,
  owner: PublicKey,
}) {
  hash(): Field {
    return Poseidon.hash(UserAccount.toFields(this))
  }
}

/**
 * # Merkle Witness
 * It represents the merkle witness for the merkle tree that is used by the Game contract.
 */
export class MyMerkleWitness extends MerkleWitness(HEIGHT) { }

/**
 * # Game Contract
 * See https://docs.minaprotocol.com/zkapps for more info.
 *
 * 
 */
export class Game extends SmartContract {
  events = {
    'buy-potion': PublicKey,
    'use-potion': PublicKey,
  }
  /**
   * # `root`
   * This state stores the root of the merkle tree that stores all the user accounts.
   */
  @state(Field) root = State<Field>();

  init() {
    // Call the `init` method of `SmartContract` class.
    super.init();

    // Create an empty merkle tree for initialization.
    const tree = new MerkleTree(10)

    // Get the root of the merkle tree.
    const root = tree.getRoot()

    // Set the `root` state to the root of the empty merkle tree.
    this.root.set(root);
  }

  @method buyPotion(path: MyMerkleWitness, account: UserAccount) {
    // Get the current root.
    const currentRoot = this.root.getAndAssertEquals()

    // Calculate the root while assuming the user doesn't not exist. 
    // We make sure that the account isn't created yet by using `Field(0)` as the leaf value.
    // Because leaf values are initialized to `Field(0)` in merkle trees.
    const calculatedRootAssumingUserDoesNotExist = path.calculateRoot(Field(0))

    // Calculate the root while assuming the user exists
    // So we can directly use the hash of the given account as the lead value. 
    const calculatedRootAssumingUserExists = path.calculateRoot(account.hash())


    // Require that either the calculated root that assumes the user does not exist,
    // or the calculated root that assumes the user exists is equal to the current root.
    currentRoot.equals(calculatedRootAssumingUserDoesNotExist)
      .or(currentRoot.equals(calculatedRootAssumingUserExists))
      .assertTrue()

    // Require the sender to be equal to the owner of the account.
    this.sender.assertEquals(account.owner)

    // Create an updated user account by adding a potion.
    const updatedAccount = new UserAccount({
      owner: account.owner,
      potionCount: account.potionCount.add(1),
    })

    // Calculate the new root by using the updated account's hash as the leaf value.
    const newRoot = path.calculateRoot(updatedAccount.hash())

    // Set the new root.
    this.root.set(newRoot)

    // Emit `buy-potion` event.
    this.emitEvent('buy-potion', this.sender)
  }

  @method usePotion(path: MyMerkleWitness, account: UserAccount) {
    // Get the current root.
    const currentRoot = this.root.getAndAssertEquals()

    // Calculate the root using the path. 
    // We also make sure that the account isn't created yet by using `Field(0)` as the leaf value.
    // Because leaf values are initialized to `Field(0)` in merkle trees.
    const calculatedRoot = path.calculateRoot(account.hash())

    // Require that the calculated root is equal to the current root.
    calculatedRoot.assertEquals(currentRoot)

    // Require the sender to be equal to the owner of the account.
    this.sender.assertEquals(account.owner)

    // Require the account has at least one potion to use.
    account.potionCount.assertGreaterThanOrEqual(UInt32.from(1))

    // Create an updated user account by removing a potion.
    const updatedAccount = new UserAccount({
      owner: account.owner,
      potionCount: account.potionCount.sub(1),
    })

    // Calculate the new root by using the updated account's hash as the leaf value.
    const newRoot = path.calculateRoot(updatedAccount.hash())

    // Set the new root.
    this.root.set(newRoot)

    // Emit `use-potion` event.
    this.emitEvent('use-potion', this.sender)
  }
}
