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

export class RunePointEntity extends Struct({
    x: UInt64,
    y: UInt64,
    z: UInt64,
}) {}

export class RuneEntity extends Struct({
    fire: UInt64,
    water: UInt64,
    air: UInt64,
    earth: UInt64,
    maxrunelevel: UInt64,
}) {}

@runtimeModule()
export class Guild extends RuntimeModule<{}> {

    @state() public playerRunePoints = StateMap.from<PublicKey, RunePointEntity>(PublicKey, RunePointEntity);

    @state() public playerRunes = StateMap.from<PublicKey, RuneEntity>(PublicKey, RuneEntity);

    @runtimeMethod()
    public newPlayerRuneStats() {
        // Ensure the caller is not already having a rune stats
        assert(this.playerRunes.get(this.transaction.sender).isSome.not(), "you already have rune stats");
        // Create new rune stats for the player
        this.playerRunes.set(
            this.transaction.sender,
            new RuneEntity({ 
                fire: UInt64.From(0),
                water: UInt64.From(0),
                air: UInt64.from(0),
                earth: UInt64.From(0),
                maxrunlevel: UInt64.from(0)
            })
        );
        // Create new rune points for the player
        this.playerRunePoints.set(
            this.transaction.sender,
            new RuneEntity({ 
                x: UInt64.From(0),
                y: UInt64.From(0),
                z: UInt64.from(0)
            })
        );
    }

    // methods will be added later...
}