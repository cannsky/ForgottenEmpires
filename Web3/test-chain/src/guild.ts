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
    UInt64
} from "@proto-kit/library";

import {
    PublicKey,
    Struct
} from "o1js";

export class GuildEntity extends Struct({
    leader: PublicKey,
    memberCount: UInt64,
}) {}

export class GuildWarEntity extends Struct({
    guildone: UInt64,
    guildtwo: UInt64,
    winner: UInt64
}) {}

@runtimeModule()
export class Guild extends RuntimeModule<{}> {

    @state() public guilds = StateMap.from<UInt64, GuildEntity>(UInt64, GuildEntity);

    @state() public playerGuilds = StateMap.from<PublicKey, UInt64>(PublicKey, UInt64);

    @state() public guildCount = State.from<UInt64>(UInt64);

    @state() public guildWars = StateMap.from<UInt64, GuildWarEntity>(UInt64, GuildWarEntity);

    @state() public guildWarCount = State.from<UInt64>(UInt64);

    @runtimeMethod()
    public joinGuild(guildId: UInt64) {
        // Ensure the guild exists
        assert(this.guilds.get(guildId).isSome, "Guild does not exist");
        // Get the guild
        const guild = this.guilds.get(guildId).value;
        // Ensure the guild is not full
        assert(guild.value.memberCount.lessThan(UInt64.from(50)), "Guild is full");
        // Ensure the player is not already in a guild
        assert(this.playerGuilds.get(this.transaction.sender.value).isSome.not(), "You are already in a guild");
        // Get guild member count
        const guildMemberCount = guild.memberCount;
        // Increase guild member count by 1
        const newGuildMemberCount = guildMemberCount.add(UInt64.from(1));
        // Update guild member count
        this.guilds.set(
            guildId,
            new GuildEntity({ 
                leader: guild.leader,
                memberCount: newGuildMemberCount
            })
        );
        // Set players guild as the joined guild
        this.playerGuilds.set(this.transaction.sender.value, guildId);
    }

    @runtimeMethod()
    public leaveGuild(guildId: UInt64) {
        // Ensure the guild exists
        assert(this.guilds.get(guildId).isSome, "Guild does not exist");
        // Get the guild
        const guild = this.guilds.get(guildId).value;
        // Ensure the guild have at least 2 members
        assert(guild.memberCount.greaterThan(UInt64.from(2)), "You are the only player at the guild, you cannot leave the guild");
        // Ensure the guild leader is not leaving
        assert(this.transaction.sender.value.equal(guild.leader).not(), "Leader cannot leave the guild");
        // Ensure that player is in some guild
        assert(this.playerGuilds.get(this.transaction.sender.value).isSome, "You are not in any guild!");
        // Ensure the player is in the given guild
        assert(this.playerGuilds.get(this.transaction.sender.value).equal(guildId), "This is not your guild!");
        // Get guild member count
        const guildMemberCount = guild.memberCount;
        // Decrease guild member count by 1
        const newGuildMemberCount = UInt64.from(guildMemberCount).sub(UInt64.from(1));
        // Update guild member count
        this.guilds.set(
            guildId,
            new GuildEntity({ 
                leader: guild.leader,
                memberCount: newGuildMemberCount
            })
        );
        // Remove player from the guild
        this.playerGuilds.set(this.transaction.sender.value, UInt64.From(0));
    }

    @runtimeMethod()
    public declareWar(guildId: UInt64, guildId2: UInt64) {
        // Ensure the guild exists
        assert(this.guilds.get(guildId).isSome, "Your guild does not exist");
        // Ensure the guild exists
        assert(this.guilds.get(guildId2).isSome, "Other guild does not exist");
        // Ensure the guild leader is declaring war
        assert(this.transaction.sender.equal(guild.leader), "Only guild leader can declare war");
        // Get the guild
        const guild = this.guilds.get(guildId).value;
        // Ensure the guild have at least 2 members
        assert(guild.memberCount.greaterThan(UInt64.from(2)), "You are the only player at the guild, you need at least 2 players to declare war");
        // Get guild war count
        const guildWarCount = this.guildWarCount.get().value;
        // Decrease guild member count by 1
        const newGuildWarCount = UInt64.from(guildWarCount).add(UInt64.from(1));
        // Update new guild war count
        this.guildWarCount.set(newGuildWarCount);
        // Add new guild war
        this.guildWars.set(
            newGuildWarCount,
            new GuildWarEntity({ 
                guildone: guildId,
                guildtwo: guildId2,
                winner: UInt64.from(0)
            })
        );
    }

    // methods will be added later...
}