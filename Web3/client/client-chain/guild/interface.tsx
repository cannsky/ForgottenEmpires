// This code is not completed.
// This code is not audited.

import { Client } from "../../client";

export interface GuildState {
    loading: boolean,
    guilds: {
        [key: string]: {
            leader: string, 
            memberCount: string
        };
    },
    newGuild: (client: Client, address: string) => Promise<void>,
    joinGuild: (client: Client, address: string, guildId: number) => Promise<void>,
    leaveGuild: (client: Client, address: string, guildId: number) => Promise<void>,
}