// This code is not completed.
// This code is not audited.

import {
    RuntimeModule,
    runtimeModule,
    state,
    runtimeMethod,
} from "@proto-kit/module";

import {
    StateMap,
    assert
} from "@proto-kit/protocol";

import {
    PublicKey,
    Struct,
    UInt64
} from "o1js";

export class KingdomEntity extends Struct({
    leader: PublicKey,
    memberCount: UInt64,
}) {}

@runtimeModule()
export class Kingdom extends RuntimeModule<{}> {

    @state() public kingdoms = StateMap.from<UInt64, KingdomEntity>(UInt64, KingdomEntity);

    @state() public playerKingdoms = StateMap.from<PublicKey, UInt64>(PublicKey, UInt64);

    @state() public kingdomCount = State.from<UInt64>(UInt64);

    @runtimeMethod()
    public newKingdom() {
        // Ensure the caller is not already in a kingdom
        assert(this.playerKingdoms.get(this.transaction.sender).isSome.not(), "you cannot be in two kingdoms at the same time")
        // Get kingdom count
        const kingdomCount = this.kingdomCount.get();
        // Add 1 to kingdom count
        const newKingdomCount = kingdomCount.value.add(1);
        // Update kingdom count
        this.kingdomCount.set(newKingdomCount);
        // Create new kingdom
        this.kingdoms.set(
            newKingdomCount,
            new KingdomEntity({ 
                leader: this.transaction.sender,
                memberCount: UInt64.From(0)
            })
        );
        // Add the player who created the kingdom to the guild as member
        this.playerKingdoms.set(this.transaction.sender, newKingdomCount);
    }
}