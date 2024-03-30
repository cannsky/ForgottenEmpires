// This code is not completed.
// This code is not audited.

export interface PlayerState {
    loading: boolean,
    players: {
        [key: string]: {level: string, xp: string};
    },
    newPlayer: (client: Client, address: string) => Promise<void>;
}

export interface PlayerStatsState {
    loading: boolean,
    playerStats: {
        [key: string]: {charisma: string, reputation: string, maxupgrade: string, leadership: string, bravery: string}
    }
}