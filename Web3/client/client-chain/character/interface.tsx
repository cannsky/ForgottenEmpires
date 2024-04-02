// This code is not completed.
// This code is not audited.

import { Client } from "../../client";

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
    newCharacter: (client: Client, address: string, characterType: number) => Promise<void>,
    levelUp: (client: Client, address: string, characterId: number) => Promise<void>,
    upgradeDamage: (client: Client, address: string, characterId: number) => Promise<void>,
    upgradeDefense: (client: Client, address: string, characterId: number) => Promise<void>,
    upgradeMaxUpgrade: (client: Client, address: string, characterId: number) => Promise<void>,
    changeWorld: (client: Client, address: string, characterId: number, worldId: number) => Promise<void>
}