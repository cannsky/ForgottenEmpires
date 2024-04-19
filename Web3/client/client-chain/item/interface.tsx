// This code is not completed.
// This code is not audited.

import { Client } from "../../client";

export interface ItemState {
    loading: boolean,
    items: {
        [key: string]: {
            [id: string] : {
                statxp: string, 
                damage: string,
                defense: string,
                consumable: Bool,
                upgradable: Bool,
                type: string,
                value: string,
            };
        };
    },
    getItem: (client: Client, address: string, itemid: number) => Promise<void>,
    newItem: (client: Client, address: string, itemType: number) => Promise<void>,
    equipItem: (client: Client, address: string, equipeditemslot: number, itemid: number) => Promise<void>,
    unequipItem: (client: Client, address: string, equipeditemslot: number) => Promise<void>,
    upgradeDamage: (client: Client, address: string, itemid: number) => Promise<void>,
    upgradeDefense: (client: Client, address: string, itemid: number) => Promise<void>,
    consumeItem: (client: Client, address: string, itemid: number) => Promise<void>,
}