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

export class PlayerStatsEntity extends Struct({
    charisma: UInt64,
    reputation: UInt64,
    maxupgrade: UInt64,
    leadership: UInt64,
    bravery: UInt64,
}) {}

@runtimeModule()
export class Player extends RuntimeModule<{}> {

    @state() public players = StateMap.from<PublicKey, PlayerEntity>(PublicKey, PlayerEntity);

    @state() public playerStats = StateMap.from<PublicKey, PlayerStatsEntity>(UInt64, PlayerStatsEntity);

    @runtimeMethod()
    public newPlayer() {
        // Check if there is a player or not
        assert(this.players.get(this.transaction.sender).isSome.not(), "you cannot create two players");
        // Create new player
        this.players.set(
            this.transaction.sender,
            new PlayerEntity({
                level: UInt64.from(1),
                xp: UInt64.from(1000)
            })
        );
        // Set new player stats
        this.playerStats.set(
            this.transaction.sender,
            new PlayerStatsEntity({
                charisma: UInt64.from(1),
                reputation: UInt64.from(1),
                maxupgrade: UInt64.from(1),
                leadership: UInt64.from(0),
                bravery: UInt64.from(0),
            })
        );
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
        assert(currentXP.greaterThanOrEqual(1000), "not enough xp");
        // Calculate new level of the player
        const newLevel = currentLevel.add(1);
        // calculate new xp of the player
        const newXP = currentXP.sub(1000);
        // Set new xp and level of the player
        this.players.set(
            this.transaction.sender, 
            new PlayerEntity({ 
                level: UInt64.from(newLevel.toBigInt()), 
                xp: UInt64.from(newXP.toBigInt()
            })
        );
        // Check if there is a player stats or not
        assert(this.playerStats.get(this.transaction.sender).isSome, "there is no player stats on this address");
        // Get player stats
        const playerStats = this.playerStats.get(this.transaction.sender).value;
        // Get current charisma
        const currentCharisma = playerStats.charisma;
        // Increase current charisma by 1
        const newCharisma = currentCharisma.add(1);
        // Increase charisma by 1 on each level up
        this.playerStats.set(
            this.transaction.sender,
            new PlayerStatsEntity({
                charisma: newCharisma,
                reputation: playerStats.reputation,
                maxupgrade: playerStats.maxupgrade,
                leadership: playerStats.leadership,
                bravery: playerStats.bravery,
            })
        );
    }

    @runtimeMethod()
    public increaseLeadership() {
        // Check if there is a player or not
        assert(this.players.get(this.transaction.sender).isSome, "there is no player on this address");
        // Check if there is a player stats or not
        assert(this.playerStats.get(this.transaction.sender).isSome, "there is no player stats on this address");
        // Get player stats
        const playerStats = this.playerStats.get(this.transaction.sender).value;
        // Get current charisma of the player
        const currentCharisma = playerStats.charisma;
        // Get current leadership of the player
        const currentLeadership = playerStats.leadership
        // Check if the charisma is enough for a increasing the leadership
        assert(currentCharisma.greaterThanOrEqual(1), "not enough charisma");
        // Calculate new leadership of the player
        const newLeadership = currentLeadership.add(1);
        // calculate new charisma of the player
        const newCharisma = currentCharisma.sub(1);
        // Set new charisma and leadership of the player
        this.playerStats.set(
            this.transaction.sender,
            new PlayerStatsEntity({
                charisma: newCharisma,
                reputation: playerStats.reputation,
                maxupgrade: playerStats.maxupgrade,
                leadership: newLeadership,
                bravery: playerStats.bravery,
            })
        );
    }

    @runtimeMethod()
    public increaseBravery() {
        // Check if there is a player or not
        assert(this.players.get(this.transaction.sender).isSome, "there is no player on this address");
        // Check if there is a player stats or not
        assert(this.playerStats.get(this.transaction.sender).isSome, "there is no player stats on this address");
        // Get player stats
        const playerStats = this.playerStats.get(this.transaction.sender).value;
        // Get current reputation of the player
        const currentReputation = playerStats.reputation;
        // Get current bravery of the player
        const currentBravery = playerStats.bravery
        // Check if the reputation is enough for a increasing the bravery
        assert(currentReputation.greaterThanOrEqual(1), "not enough bravery");
        // Calculate new bravery of the player
        const newBravery = currentBravery.add(1);
        // calculate new reputation of the player
        const newReputation = currentReputation.sub(1);
        // Set new reputation and bravery of the player
        this.playerStats.set(
            this.transaction.sender,
            new PlayerStatsEntity({
                charisma: playerStats.charisma,
                reputation: newReputation,
                maxupgrade: playerStats.maxupgrade,
                leadership: playerStats.leadership,
                bravery: newBravery,
            })
        );
    }

    @runtimeMethod()
    public getTotalLeadership() {
        // Check if there is a player or not
        assert(this.players.get(this.transaction.sender).isSome, "there is no player on this address");
        // Check if there is a player stats or not
        assert(this.playerStats.get(this.transaction.sender).isSome, "there is no player stats on this address");
        // Get player
        const player = this.players.get(this.transaction.sender).value;
        // Get player stats
        const playerStats = this.playerStats.get(this.transaction.sender).value;
        // Get player level
        const playerLevel = player.level;
        // Get player leadership
        const playerLeadership = playerStats.leadership;
        // Get total leadership
        const totalLoadership = playerLevel.mul(playerLeadership);
        // Return total leadership calculated
        return totalLoadership;
    }

    @runtimeMethod()
    public getTotalBravery() {
        // Check if there is a player or not
        assert(this.players.get(this.transaction.sender).isSome, "there is no player on this address");
        // Check if there is a player stats or not
        assert(this.playerStats.get(this.transaction.sender).isSome, "there is no player stats on this address");
        // Get player
        const player = this.players.get(this.transaction.sender).value;
        // Get player stats
        const playerStats = this.playerStats.get(this.transaction.sender).value;
        // Get player bravery
        const playerLevel = player.level;
        // Get player bravery
        const playerBravery = playerStats.bravery;
        // Get total bravery
        const totalBravery = playerLevel.mul(playerBravery);
        // Return total bravery calculated
        return totalBravery;
    }

    // methods will be added later...
}