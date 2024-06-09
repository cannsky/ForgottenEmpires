// This code is not completed.
// This code is not audited.

import { Client } from "../client";
import { PendingTransaction } from "@proto-kit/sequencer";

export interface KingdomState {
    loading: boolean,
    kingdoms: {
        [key: string]: {
            leader: string, 
            memberCount: string,
            warid: string
        };
    },
    getPlayerKingdom: (client: Client, address: string) => Promise<void>,
    changeKingdom: (client: Client, address: string, kingdomId: number) => Promise<PendingTransaction>,
    newWarRequest: (client: Client, address: string, kingdomId: number) => Promise<PendingTransaction>,
    newPeaceRequest: (client: Client, address: string, warId: number) => Promise<PendingTransaction>,
    favorWarRequest: (client: Client, address: string, warRequestId: number, voteCount: number) => Promise<PendingTransaction>,
    favorPeaceRequest: (client: Client, address: string, peaceRequestId: number, voteCount: number) => Promise<PendingTransaction>,
}