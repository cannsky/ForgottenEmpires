// This code is not completed.
// This code is not audited.

import { Client } from "../../client";

export interface PlayerState {
    loading: boolean,
    players: {
        [key: string]: {level: string, xp: string};
    },
    playerStats: {
        [key: string]: {charisma: string, reputation: string, maxupgrade: string, leadership: string, bravery: string}
    },
    newPlayer: (client: Client, address: string) => Promise<void>,
    levelUp: (client: Client, address: string) => Promise<void>,
    increaseLeadership: (client: Client, address: string) => Promise<void>,
    increaseBravery: (client: Client, address: string) => Promise<void>,
}