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

export class PlayerEntity extends Struct({
    level: UInt64,
    xp: UInt64
}) {}

export class PlayerReputationStatsEntity extends Struct({
    reputationpoints: UInt64,
    maxreputation: UInt64,
}) {}

export class PlayerReputationEntity extends Struct({
    charismatic: UInt64,
    leadership: UInt64,
    bravery: UInt64,
    maxreputationlevel: UInt64,
}) {}

@runtimeModule()
export class Player extends RuntimeModule<{}> {

    @state() public players = StateMap.from<PublicKey, PlayerEntity>(PublicKey, PlayerEntity);

    @state() public playerReputationStats = StateMap.from<PublicKey, PlayerReputationStatsEntity>(UInt64, PlayerReputationStatsEntity);

    @state() public playerReputations = StateMap.from<PublicKey, PlayerReputationEntity>(PublicKey, PlayerReputationEntity);

    @runtimeMethod()
    public newPlayer() {
        // Check if there is a player or not
        assert(this.players.get(this.transaction.sender).isSome.not(), "you cannot create two players")
        // Create new player
        this.players.set(
            this.transaction.sender,
            new PlayerEntity({
                level: UInt64.from(1),
                xp: UInt64.from(1000)
            })
        )
    }

    @runtimeMethod()
    public levelUP() {
        // Check if there is a player or not
        assert(this.players.get(this.transaction.sender).isSome, "there is no player on this address");
        // Get player
        const player = this.players.get(this.transaction.sender).value;
        // Get current xp value of the player
        const currentXP = player.xp;
        // Get current level value of the player
        const currentLevel = player.level;
        // Check if the xp is enough for a level up
        assert(currentXP.value.greaterThanOrEqual(1000), "not enough xp");
        // Calculate new level of the player
        const newLevel = currentLevel.value.add(1);
        // calculate new xp of the player
        const newXP = currentXP.value.sub(1000);
        // Set new xp and level of the player
        this.players.set(
            this.transaction.sender, 
            new PlayerEntity({ 
                level: UInt64.from(newLevel.toBigInt()), 
                xp: UInt64.from(newXP.toBigInt()
            })
        );
    }

    // methods will be added later...
}