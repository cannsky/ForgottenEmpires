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
    UInt64
} from "@proto-kit/library";

import {
    PublicKey,
    Struct,
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
    Guild,
    GuildEntity
} from "../guild";

export class GuildCreationPublicOutput extends Struct({
    root: Field,
    nullifier: Field
}) {}

export const message: Field[] = [Field(0)];

export function canCreate(witness: MerkleMapWitness, nullifier: Nullifier) : GuildCreationPublicOutput {
    // Get key from public key
    const key = Poseidon.hash(nullifier.getPublicKey().toFields());
    // Get computed root and computed key
    const [computedRoot, computedKey] = witness.computeRootAndKey(Bool(true).toField());
    // Ensure computed key is equal to the key
    computedKey.assertEquals(key);
    // Verfiy the message
    nullifier.verify(message);
    // Return guid creation public output
    return new GuildCreationPublicOutput({
        root: computedRoot,
        nullifier: nullifier.key(),
    });
}

export const guildCreation = Experimental.ZkProgram({
    publicOutput: GuildCreationPublicOutput,
    methods: {
        canCreate: {
            privateInputs: [MerkleMapWitness, Nullifier],
            method: canCreate,
        },
    },
});

export class GuildCreationProof extends Experimental.ZkProgram.Proof(guildCreation) {}

type GuildCreationConfig = Record<string, never>;

@runtimeMethod
export class GuildCreation extends RuntimeModule<GuildCreationConfig>{
    
    @state() public commitment = State.from<Field>(Field);
    
    @state() public nullifiers = StateMap.from<Field, Bool>(Field, Bool);

    public constructor(@inject("Guild") public guild: Guild) {
        super();
    }

    @runtimeMethod
    public setCommitment(commitment: Field) {
        this.commitment.set(commitment);
    }

    @runtimeMethod
    public createGuild(guildCreationProof: GuildCreationProof) {
        // Verfiy guild creation proof
        guildCreationProof.verify();
        // Get commitment
        const commitment = this.commitment.get();
        // Check if commitment value and guild creation proof public output root is equal or not
        assert(
            guildCreationProof.publicOutput.root.equals(commitment.value),
            "Guild creation proof does not contain the correct commitment"
        );
        // Get is nullifier used from nullifiers
        const isNullifierUsed = this.nullifiers.get(
            guildCreationProof.publicOutput.nullifier
        );
        // If guild is created, it cannot be created again
        assert(isNullifierUsed.value.not(), "Nullifier has already been used");
        // Set guild created nullifier to true
        this.nullifiers.set(guildCreationProof.publicOutput.nullifier, Bool(true));
        // Ensure the caller is not already leading a guild
        assert(this.guild.playerGuilds.get(this.transaction.sender.value).isSome.not(), "you cannot be in two guilds at the same time")
        // Get guild count
        const guildCount = this.guild.guildCount.get().value;
        // Add 1 to guild count
        const newGuildCount = UInt64.from(guildCount).add(UInt64.from(1));
        // Update guild count
        this.guild.guildCount.set(newGuildCount);
        // Create new guild
        this.guild.guilds.set(
            newGuildCount,
            new GuildEntity({ 
                leader: this.transaction.sender.value,
                memberCount: UInt64.From(0)
            })
        );
        // Add the player who created the guild to the guild as member
        this.guild.playerGuilds.set(this.transaction.sender.value, newGuildCount);
    }
}