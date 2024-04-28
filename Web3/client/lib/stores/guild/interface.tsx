// This code is not completed.
// This code is not audited.

import { Client } from "../client";
import { PendingTransaction } from "@proto-kit/sequencer";

export interface GuildState {
    loading: boolean,
    guilds: {
        [key: string]: {
            leader: string, 
            memberCount: string
        };
    },
    getPlayerGuild: (client: Client, address: string) => Promise<void>,
    newGuild: (client: Client, address: string) => Promise<PendingTransaction>,
    joinGuild: (client: Client, address: string, guildId: number) => Promise<PendingTransaction>,
    leaveGuild: (client: Client, address: string, guildId: number) => Promise<PendingTransaction>,
}