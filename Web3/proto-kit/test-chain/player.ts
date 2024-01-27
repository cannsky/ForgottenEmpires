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
    kingdom: UInt64,
}) {}

@runtimeModule()
export class Player extends RuntimeModule<{}> {

    @state() public players = StateMap.from<PublicKey, PlayerEntity>(PublicKey, PlayerEntity);

    @runtimeMethod()
    public newPlayer(kingdom: UInt64) {
        // Check if there is a player or not
        assert(this.players.get(this.transaction.sender).isSome.not(), "you cannot create two players")
        // Create new player
        this.players.set(
            this.transaction.sender,
            new PlayerEntity({
                level: 1,
                xp: 1000,
                kingdom: kingdom
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
                level: newLevel, 
                xp: newXP,
                kingdom: player.kingdom
            })
        );
    }

    @runtimeMethod()
    public changeKingdom(kingdom: UInt64) {
        // Check if there is a player or not
        assert(this.players.get(this.transaction.sender).isSome, "there is no player on this address");
        // Get player
        const player = this.players.get(this.transaction.sender).value;
        // Get current kingdom of the player
        const currentKingdom = player.kingdom;
        // Check if the new kingdom is equal to old kingdom
        assert(currentKingdom.value.equal(kingdom), "selected kingdom cannot be the same kingdom");
        // Set new kingdom of the player
        this.players.set(
            this.transaction.sender,
            new PlayerEntity({ 
                level: player.level, 
                xp: player.xp,
                kingdom: kingdom
            })
        );
    }

    // methods will be added later...
}