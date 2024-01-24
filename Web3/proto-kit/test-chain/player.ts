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
    xp: UInt64,
}) {}

@runtimeModule()
export class Player extends RuntimeModule<{}> {

    @state() public players = StateMap.from<PublicKey, PlayerEntity>(PublicKey, PlayerEntity);

    // For testing
    @runtimeMethod()
    public addXP(address: PublicKey, amount: UInt64) {
        // Get player
        const player = this.players.get(address).value;
        // Get current xp value of the player
        const currentXP = player.xp;
        // Calculate new xp value of the player
        const newXP = currentXP.value.add(amount);
        // Set the new xp of the player
        this.players.set(
            address, 
            new PlayerEntity({ level: player.level, xp: newXP })
        );
    }

    @runtimeMethod()
    public levelUP(address: PublicKey) {
        // Get player
        const player = this.players.get(address).value;
        // Get current xp value of the player
        const currentXP = player.xp;
        // Get current level value of the player
        const currentLevel = player.level;
        // Check if the xp is enough for a level up
        assert(currentXP.value.greaterThanOrEqual(1000), "not enough xp");
        // Calculate new level of the player
        const newLevel = currentLevel.value.add(1);
        // calculate new xp of the player
        const newXP = player.currentXP.value.sub(1000);
        // Set new xp and level of the player
        this.players.set(
            address, 
            new PlayerEntity({ level: newLevel, xp: newXP, })
        );
    }

    // methods will be added later...
}