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
    firelevel: UInt64,
    waterlevel: UInt64,
    airlevel: UInt64,
    earthlevel: UInt64,
    maxrunelevel: UInt64,
}) {}

@runtimeModule()
export class Rune extends RuntimeModule<{}> {

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
                firelevel: UInt64.From(1),
                waterlevel: UInt64.From(1),
                airlevel: UInt64.from(1),
                earthlevel: UInt64.From(1),
                maxrunelevel: UInt64.from(10)
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

    @runtimeMethod()
    public upgradeFireRune() {
        // Ensure the caller has rune stats
        assert(this.playerRunes.get(this.transaction.sender).isSome, "you don't have rune stats");
        // Ensure the caller has rune points
        assert(this.playerRunePoints.get(this.transaction.sender).isSome, "you don't have rune points");
        // Get player rune points
        const runePoints = this.playerRunePoints.get(this.transaction.sender).value;
        // Get x rune points
        const currentXPoints = runePoints.x;
        // Get y rune points
        const currentYPoints = runePoints.y;
        // Ensure at least 2 x points is available
        assert(currentXPoints.greaterThanOrEqual(UInt64.from(2)), "you don't have enough x points");
        // Ensure at least 1 y points is available
        assert(currentYPoints.greaterThanOrEqual(UInt64.from(1)), "you don't have enough y points");
        // Get player runes
        const runes = this.playerRunes.get(this.transaction.sender).value;
        // Get player fire rune level
        const currentFireLevel = runes.firelevel;
        // Get player max rune level
        const currentMaxRuneLevel = runes.maxrunelevel;
        // Ensure fire rune level is not maxed yet
        assert(currentFireLevel.lessThanOrEqual(currentMaxRuneLevel), "you already maxed your rune level");
        // Increase rune level by 1
        const newFireLevel = currentFireLevel.add(1);
        // Decrease x rune points by 2
        const newXPoints = currentXPoints.sub(2);
        // Decrease y rune points by 1
        const newYPoints = currentYPoints.sub(1);
        // Update player runes for new rune level
        this.playerRunes.set(
            this.transaction.sender,
            new RuneEntity({ 
                firelevel: newFireLevel,
                waterlevel: runes.waterlevel,
                airlevel: runes.airlevel,
                earthlevel: runes.earthlevel,
                maxrunelevel: runes.maxrunelevel
            })
        );
        // Update player rune points for new rune points
        this.playerRunePoints.set(
            this.transaction.sender,
            new RuneEntity({ 
                x: newXPoints,
                y: newYPoints,
                z: runePoints.z
            })
        );
    }

    @runtimeMethod()
    public upgradeWaterRune() {
        // Ensure the caller has rune stats
        assert(this.playerRunes.get(this.transaction.sender).isSome, "you don't have rune stats");
        // Ensure the caller has rune points
        assert(this.playerRunePoints.get(this.transaction.sender).isSome, "you don't have rune points");
        // Get player rune points
        const runePoints = this.playerRunePoints.get(this.transaction.sender).value;
        // Get x rune points
        const currentXPoints = runePoints.x;
        // Get z rune points
        const currentZPoints = runePoints.z;
        // Ensure at least 1 x points is available
        assert(currentXPoints.greaterThanOrEqual(UInt64.from(1)), "you don't have enough x points");
        // Ensure at least 2 z points is available
        assert(currentZPoints.greaterThanOrEqual(UInt64.from(2)), "you don't have enough z points");
        // Get player runes
        const runes = this.playerRunes.get(this.transaction.sender).value;
        // Get player water rune level
        const currentWaterLevel = runes.waterlevel;
        // Get player max rune level
        const currentMaxRuneLevel = runes.maxrunelevel;
        // Ensure water rune level is not maxed yet
        assert(currentWaterLevel.lessThanOrEqual(currentMaxRuneLevel), "you already maxed your rune level");
        // Increase rune level by 1
        const newWaterLevel = currentWaterLevel.add(1);
        // Decrease x rune points by 1
        const newXPoints = currentXPoints.sub(1);
        // Decrease z rune points by 2
        const newZPoints = currentZPoints.sub(2);
        // Update player runes for new rune level
        this.playerRunes.set(
            this.transaction.sender,
            new RuneEntity({
                firelevel: runes.firelevel,
                waterlevel: newWaterLevel,
                airlevel: runes.airlevel,
                earthlevel: runes.earthlevel,
                maxrunelevel: runes.maxrunelevel
            })
        );
        // Update player rune points for new rune points
        this.playerRunePoints.set(
            this.transaction.sender,
            new RuneEntity({ 
                x: newXPoints,
                y: runePoints.y,
                z: newZPoints
            })
        );
    }

    @runtimeMethod()
    public upgradeAirRune() {
        // Ensure the caller has rune stats
        assert(this.playerRunes.get(this.transaction.sender).isSome, "you don't have rune stats");
        // Ensure the caller has rune points
        assert(this.playerRunePoints.get(this.transaction.sender).isSome, "you don't have rune points");
        // Get player rune points
        const runePoints = this.playerRunePoints.get(this.transaction.sender).value;
        // Get x rune points
        const currentXPoints = runePoints.x;
        // Get y rune points
        const currentYPoints = runePoints.y;
        // Ensure at least 1 x points is available
        assert(currentXPoints.greaterThanOrEqual(UInt64.from(1)), "you don't have enough x points");
        // Ensure at least 2 y points is available
        assert(currentYPoints.greaterThanOrEqual(UInt64.from(2)), "you don't have enough y points");
        // Get player runes
        const runes = this.playerRunes.get(this.transaction.sender).value;
        // Get player air rune level
        const currentAirLevel = runes.airlevel;
        // Get player max rune level
        const currentMaxRuneLevel = runes.maxrunelevel;
        // Ensure air rune level is not maxed yet
        assert(currentAirLevel.lessThanOrEqual(currentMaxRuneLevel), "you already maxed your rune level");
        // Increase rune level by 1
        const newAirLevel = currentAirLevel.add(1);
        // Decrease x rune points by 1
        const newXPoints = currentXPoints.sub(1);
        // Decrease y rune points by 2
        const newYPoints = currentYPoints.sub(2);
        // Update player runes for new rune level
        this.playerRunes.set(
            this.transaction.sender,
            new RuneEntity({ 
                firelevel: runes.firelevel,
                waterlevel: runes.waterlevel,
                airlevel: newAirLevel,
                earthlevel: runes.earthlevel,
                maxrunelevel: runes.maxrunelevel
            })
        );
        // Update player rune points for new rune points
        this.playerRunePoints.set(
            this.transaction.sender,
            new RuneEntity({ 
                x: newXPoints,
                y: newYPoints,
                z: runePoints.z
            })
        );
    }

    @runtimeMethod()
    public upgradeEarthRune() {
        // Ensure the caller has rune stats
        assert(this.playerRunes.get(this.transaction.sender).isSome, "you don't have rune stats");
        // Ensure the caller has rune points
        assert(this.playerRunePoints.get(this.transaction.sender).isSome, "you don't have rune points");
        // Get player rune points
        const runePoints = this.playerRunePoints.get(this.transaction.sender).value;
        // Get x rune points
        const currentXPoints = runePoints.x;
        // Get z rune points
        const currentZPoints = runePoints.z;
        // Ensure at least 2 x points is available
        assert(currentXPoints.greaterThanOrEqual(UInt64.from(2)), "you don't have enough x points");
        // Ensure at least 1 z points is available
        assert(currentZPoints.greaterThanOrEqual(UInt64.from(1)), "you don't have enough z points");
        // Get player runes
        const runes = this.playerRunes.get(this.transaction.sender).value;
        // Get player earth rune level
        const currentEarthLevel = runes.earthlevel;
        // Get player max rune level
        const currentMaxRuneLevel = runes.maxrunelevel;
        // Ensure earth rune level is not maxed yet
        assert(currentEarthLevel.lessThanOrEqual(currentMaxRuneLevel), "you already maxed your rune level");
        // Increase rune level by 1
        const newEarthLevel = currentEarthLevel.add(1);
        // Decrease x rune points by 2
        const newXPoints = currentXPoints.sub(2);
        // Decrease z rune points by 1
        const newZPoints = currentZPoints.sub(1);
        // Update player runes for new rune level
        this.playerRunes.set(
            this.transaction.sender,
            new RuneEntity({
                firelevel: runes.firelevel,
                waterlevel: runes.earthlevel,
                airlevel: runes.airlevel,
                earthlevel: newEarthLevel,
                maxrunelevel: runes.maxrunelevel
            })
        );
        // Update player rune points for new rune points
        this.playerRunePoints.set(
            this.transaction.sender,
            new RuneEntity({ 
                x: newXPoints,
                y: runePoints.y,
                z: newZPoints
            })
        );
    }

    @runtimeMethod()
    public getAttackRunePower() {
        // Ensure the caller has rune stats
        assert(this.playerRunes.get(this.transaction.sender).isSome, "you don't have rune stats");
        // Ensure the caller has rune points
        assert(this.playerRunePoints.get(this.transaction.sender).isSome, "you don't have rune points");
        // Get player runes
        const runes = this.playerRunes.get(this.transaction.sender).value;
        // Get player fire rune level
        const currentFireLevel = runes.firelevel;
        // Get player air rune level
        const currentAirLevel = runes.airlevel;
        // Calculate attack power
        const attackRunePower = currentFireLevel.add(currentAirLevel);
        // Return attack rune power
        return attackRunePower;
    }

    @runtimeMethod()
    public getDefenseRunePower() {
        // Ensure the caller has rune stats
        assert(this.playerRunes.get(this.transaction.sender).isSome, "you don't have rune stats");
        // Ensure the caller has rune points
        assert(this.playerRunePoints.get(this.transaction.sender).isSome, "you don't have rune points");
        // Get player runes
        const runes = this.playerRunes.get(this.transaction.sender).value;
        // Get player water rune level
        const currentWaterLevel = runes.waterlevel;
        // Get player earth rune level
        const currentEarthLevel = runes.earthlevel;
        // Calculate attack power
        const defenseRunePower = currentWaterLevel.add(currentEarthLevel);
        // Return defense rune power
        return defenseRunePower;
    }

    // methods will be added later...
}