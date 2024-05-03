// This code is not completed.
// This code is not audited.

import { Client } from "../client";
import { PendingTransaction } from "@proto-kit/sequencer";

export interface TeamState {
    loading: boolean,
    teams: {
        [id: string]: {
            leader: string, 
            memberCount: string
        };
    },
    getTeam: (client: Client, address: string, teamId: number) => Promise<void>,
    newTeam: (client: Client, address: string) => Promise<PendingTransaction>,
    invitePlayer: (client: Client, address: string, playerAddress: string, teamId: number) => Promise<PendingTransaction>,
    acceptInvitation: (client: Client, address: string, teamId: number) => Promise<PendingTransaction>,
    leaveTeam: (client: Client, address: string, teamId: number) => Promise<PendingTransaction>,
}