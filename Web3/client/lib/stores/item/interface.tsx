// This code is not completed.
// This code is not audited.

import { Client } from "../../client";
import { PendingTransaction } from "@proto-kit/sequencer";

export interface ItemState {
    loading: boolean,
    items: {
        [key: string]: {
            [id: string] : {
                statxp: string, 
                damage: string,
                defense: string,
                consumable: boolean,
                upgradable: boolean,
                type: string,
                value: string,
            };
        };
    },
    getItem: (client: Client, address: string, itemid: number) => Promise<void>,
    newItem: (client: Client, address: string, itemType: number) => Promise<PendingTransaction>,
    equipItem: (client: Client, address: string, equipeditemslot: number, itemid: number) => Promise<PendingTransaction>,
    unequipItem: (client: Client, address: string, equipeditemslot: number) => Promise<PendingTransaction>,
    upgradeDamage: (client: Client, address: string, itemid: number) => Promise<PendingTransaction>,
    upgradeDefense: (client: Client, address: string, itemid: number) => Promise<PendingTransaction>,
    consumeItem: (client: Client, address: string, itemid: number) => Promise<PendingTransaction>,
}