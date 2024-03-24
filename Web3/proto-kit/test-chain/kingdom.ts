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
    public changeKingdom(kingdomId: UInt64) {
        // Check if there is a player or not
        assert(this.playerKingdoms.get(this.transaction.sender).isSome.not(), "You cannot be in two kingdoms");
        // Check if there is a kingdom in the specified id
        assert(this.kingdoms.get(kingdomId).isSome, "There is no kingdom in the specified id");
        // Get player's current kingdom id
        const currentKingdomId = this.playerKingdoms.get(this.transaction.sender).value;
        // Check if the new kingdom is equal to old kingdom
        assert(currentKingdomId.equal(kingdomId).not(), "Selected kingdom cannot be the same kingdom");
        // Get kingdom
        const kingdom = this.kingdoms.get(kingdomId).value;
        // Get the member count of the kingdom
        const kingdomMemberCount = kingdom.memberCount;
        // Increase member count of the kingdom by 1
        const newKingdomMemberCount = kingdomMemberCount.add(1);
        // Update the kingdom with new member count
        this.kingdoms.set(
            kingdomId,
            new KingdomEntity({
                leader: kingdom.leader,
                memberCount: newKingdomMemberCount
            })
        );
        // Set players kingdom
        this.playerKingdoms.set(
            this.transaction.sender,
            kingdomId
        )
    }
}