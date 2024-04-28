// This code is not completed.
// This code is not audited.

import { Client } from "../client";
import { PendingTransaction } from "@proto-kit/sequencer";

export interface PlayerState {
    loading: boolean,
    players: {
        [key: string]: {
            level: string, 
            xp: string
        };
    },
    playerStats: {
        [key: string]: {
            charisma: string, 
            reputation: string, 
            maxupgrade: string, 
            leadership: string, 
            bravery: string
        };
    },
    login: (client: Client, address: string) => Promise<void>,
    newPlayer: (client: Client, address: string) => Promise<PendingTransaction>,
    levelUp: (client: Client, address: string) => Promise<PendingTransaction>,
    increaseLeadership: (client: Client, address: string) => Promise<PendingTransaction>,
    increaseBravery: (client: Client, address: string) => Promise<PendingTransaction>,
}