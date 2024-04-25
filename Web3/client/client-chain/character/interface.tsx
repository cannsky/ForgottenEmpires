// This code is not completed.
// This code is not audited.

import { Client } from "../../client";
import { PendingTransaction } from "@proto-kit/sequencer";

export interface CharacterState {
    loading: boolean,
    characters: {
        [key: string]: {
            level: string, 
            xp: string, 
            statxp: string, 
            damage: string, 
            defense: string, 
            type: string, 
            maxupgrade: string,
            maxlevel: string,
            world: string
        };
    },
    getSelectedCharacter: (client: Client, address: string) => Promise<void>,
    newCharacter: (client: Client, address: string, characterType: number) => Promise<PendingTransaction>,
    levelUp: (client: Client, address: string, characterId: number) => Promise<PendingTransaction>,
    upgradeDamage: (client: Client, address: string, characterId: number) => Promise<PendingTransaction>,
    upgradeDefense: (client: Client, address: string, characterId: number) => Promise<PendingTransaction>,
    upgradeMaxUpgrade: (client: Client, address: string, characterId: number) => Promise<PendingTransaction>,
    changeWorld: (client: Client, address: string, characterId: number, worldId: number) => Promise<PendingTransaction>
}