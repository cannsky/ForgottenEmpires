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
    Provable,
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
        // Set new xp value of the player
        const newXP = currentXP.value.add(amount);
        // Set the new xp of the player
        this.players.set(
            address, 
            new PlayerEntity({ xp: newXP, level: player.level })
        );
    }

    @runtimeMethod()
    public levelUP(address: PublicKey) {
        
    }

    // methods will be added later...
}