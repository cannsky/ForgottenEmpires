// This code is not completed.
// This code is not audited.

import {
    RuntimeModule,
    runtimeModule,
    state,
    runtimeMethod
} from "@proto-kit/module";

import {
    StateMap,
    State,
    assert
} from "@proto-kit/protocol";

import {
    PublicKey,
    Struct,
    UInt64,
    Bool,
    Field,
    MerkleMapWitness,
    Nullifier,
    Poseidon,
    Experimental
} from "o1js";

import {
    inject
} from "tsyringe";

import {
    Kingdom,
    KingdomEntity
} from "../kingdom";

export class KingdomCreationPublicOutput extends Struct({
    root: Field,
    nullifier: Field
}) {}

export const message: Field[] = [Field(0)];

export function canCreate(witness: MerkleMapWitness, nullifier: Nullifier) : KingdomCreationPublicOutput {
    // Get key from public key
    const key = Poseidon.hash(nullifier.getPublicKey().toFields());
    // Get computed root and computed key
    const [computedRoot, computedKey] = witness.computeRootAndKey(Bool(true).toField());
    // Ensure computed key is equal to the key
    computedKey.assertEquals(key);
    // Verfiy the message
    nullifier.verify(message);
    // Return guid creation public output
    return new KingdomCreationPublicOutput({
        root: computedRoot,
        nullifier: nullifier.key(),
    });
}

export const kingdomCreation = Experimental.ZkProgram({
    publicOutput: KingdomCreationPublicOutput,
    methods: {
        canCreate: {
            privateInputs: [MerkleMapWitness, Nullifier],
            method: canCreate,
        },
    },
});

export class KingdomCreationProof extends Experimental.ZkProgram.Proof(kingdomCreation) {}

type KingdomCreationConfig = Record<string, never>;

@runtimeMethod
export class KingdomCreation extends RuntimeModule<KingdomCreationConfig>{
    
    @state() public commitment = State.from<Field>(Field);
    
    @state() public nullifiers = StateMap.from<Field, Bool>(Field, Bool);

    public constructor(@inject("Kingdom") public kingdom: Kingdom) {
        super();
    }

    @runtimeMethod
    public setCommitment(commitment: Field) {
        this.commitment.set(commitment);
    }

    @runtimeMethod
    public createKingdom(kingdomCreationProof: KingdomCreationProof) {
        // Verfiy kingdom creation proof
        kingdomCreationProof.verify();
        // Get commitment
        const commitment = this.commitment.get();
        // Check if commitment value and kingdom creation proof public output root is equal or not
        assert(
            kingdomCreationProof.publicOutput.root.equals(commitment.value),
            "Kingdom creation proof does not contain the correct commitment"
        );
        // Get is nullifier used from nullifiers
        const isNullifierUsed = this.nullifiers.get(
            kingdomCreationProof.publicOutput.nullifier
        );
        // If kingdom is created, it cannot be created again
        assert(isNullifierUsed.value.not(), "Nullifier has already been used");
        // Set kingdom created nullifier to true
        this.nullifiers.set(kingdomCreationProof.publicOutput.nullifier, Bool(true));
        // Ensure the caller is not already in a kingdom
        assert(this.kingdom.playerKingdoms.get(this.transaction.sender).isSome.not(), "you cannot be in two kingdoms at the same time")
        // Get kingdom count
        const kingdomCount = this.kingdom.kingdomCount.get();
        // Add 1 to kingdom count
        const newKingdomCount = kingdomCount.add(1);
        // Update kingdom count
        this.kingdom.kingdomCount.set(newKingdomCount);
        // Create new kingdom
        this.kingdom.kingdoms.set(
            newKingdomCount,
            new KingdomEntity({ 
                leader: this.transaction.sender,
                memberCount: UInt64.From(0),
                warid: UInt64.from(0)
            })
        );
        // Add the player who created the kingdom to the kingdom as member
        this.kingdom.playerKingdoms.set(this.transaction.sender, newKingdomCount);
    }
}