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

export class GuildEntity extends Struct({
    leader: PublicKey,
    memberCount: UInt64,
}) {}

@runtimeModule()
export class Guild extends RuntimeModule<{}> {

    @state() public guilds = StateMap.from<UInt64, GuildEntity>(UInt64, GuildEntity);

    @state() public playerGuilds = StateMap.from<PublicKey, UInt64>(PublicKey, UInt64);

    @state() public guildCount = State.from<UInt64>(UInt64);

    @runtimeMethod()
    public newGuild() {
        // Ensure the caller is not already leading a guild
        assert(this.playerGuilds.get(this.transaction.sender).isSome.not(), "you cannot be in two guilds at the same time")
        // Get guild count
        const guildCount = this.guildCount.get();
        // Add 1 to guild count
        const newGuildCount = guildCount.value.add(1);
        // Update guild count
        this.guildCount.set(newGuildCount);
        // Create new guild
        this.guilds.set(
            newGuildCount,
            new GuildEntity({ 
                leader: this.transaction.sender,
                memberCount: UInt64.From(0)
            })
        );
        // Add the player who created the guild to the guild as member
        this.playerGuilds.set(this.transaction.sender, newGuildCount);
    }

    @runtimeMethod()
    public joinGuild(guildId: UInt64) {
        // Ensure the guild exists
        assert(this.guilds.get(guildId).isSome, "Guild does not exist");
        // Get the guild
        const guild = this.guilds.get(guildId);
        // Ensure the guild is not full
        assert(guild.value.memberCount.value.lessThan(50), "Guild is full");
        // Ensure the player is not already in a guild
        assert(this.playerGuilds.get(this.transaction.sender).isSome.not(), "You are already in a guild");
        // Get guild member count
        const guildMemberCount = guild.value.memberCount;
        // Increase guild member count by 1
        const newGuildMemberCount = guildMemberCount.value.add(1);
        // Update guild member count
        this.guilds.set(
            guildId,
            new GuildEntity({ 
                leader: guild.leader,
                memberCount: newGuildMemberCount
            })
        );
        // Set players guild as the joined guild
        this.playerGuilds.set(this.transaction.sender, guildId);
    }

    @runtimeMethod()
    public leaveGuild(guildId: UInt64) {
        // Ensure the guild exists
        assert(this.guilds.get(guildId).isSome, "Guild does not exist");
        // Get the guild
        const guild = this.guilds.get(guildId);
        // Ensure the guild have at least 2 members
        assert(guild.value.memberCount.value.greaterThan(2), "You are the only player at the guild, you cannot leave the guild");
        // Ensure the guild leader is not leaving
        assert(this.transaction.sender.equal(guild.leader).not(), "Leader cannot leave the guild");
        // Ensure that player is in some guild
        assert(this.playerGuilds.get(this.transaction.sender).isSome, "You are not in any guild!");
        // Ensure the player is in the given guild
        assert(this.playerGuilds.get(this.transaction.sender).value.equal(guildId), "This is not your guild!");
        // Get guild member count
        const guildMemberCount = guild.value.memberCount;
        // Decrease guild member count by 1
        const newGuildMemberCount = guildMemberCount.value.sub(1);
        // Update guild member count
        this.guilds.set(
            guildId,
            new GuildEntity({ 
                leader: guild.leader,
                memberCount: newGuildMemberCount
            })
        );
        // Remove player from the guild
        this.playerGuilds.set(this.transaction.sender, UInt64.From(0));
    }

    // methods will be added later...
}