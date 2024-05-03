// This code is not completed.
// This code is not audited.

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Client, useClientStore } from "../client";
import { PublicKey } from "o1js";
import { useCallback, useEffect } from "react";
import { TeamState } from "./interface";
import { PendingTransaction, UnsignedTransaction } from "@proto-kit/sequencer";
import { useWalletStore } from "../wallet";
import { useChainStore } from "../chain";

function isPendingTransaction(transaction: PendingTransaction | UnsignedTransaction | undefined) 
    : asserts transaction is PendingTransaction {
    if (!(transaction instanceof PendingTransaction)) throw new Error("Transaction is not a pending transaction");
}

export const useTeamStore = create<TeamState, [["zustand/immer", never]]>(
    immer((set) => ({
        loading: Boolean(false),
        teams: {},
        async getTeam(client: Client, address: string, teamId: number) {
            set((state) => {
                state.loading = true;
            });
            // Get client team
            const clientTeam = await client.query.runtime.Team.teams.get(UInt64.from(teamId));
            // Add client team to the teams
            set((state) => {
                state.loading = false;
                state.teams[teamId.toString()] = { 
                    leader: clientTeam?.leader.toString(), 
                    memberCount: clientTeam?.memberCount.toString() 
                };
            });
        },
        async newTeam(client: Client, address: string) {
            // Get team
            const team = client.runtime.resolve("Team");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                team.newTeam();
            });
            // Sign transaction 
            await tx.sign();
            // Send transaction
            await tx.send();
            // Check if the transaction is pending or not
            isPendingTransaction(tx.transaction);
            // Return transaction
            return tx.transaction;
        },
        async invitePlayer(client: Client, address: string, playerAddress: string, teamId: number) {
            // Get team
            const team = client.runtime.resolve("Team");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                team.invitePlayer(
                    PublicKey.fromBase58(playerAddress),
                    UInt64.from(teamId)
                );
            });
            // Sign transaction 
            await tx.sign();
            // Send transaction
            await tx.send();
            // Check if the transaction is pending or not
            isPendingTransaction(tx.transaction);
            // Return transaction
            return tx.transaction;
        },
        async acceptInvitation(client: Client, address: string, teamId: number) {
            // Get team
            const team = client.runtime.resolve("Team");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                team.acceptInvitation(
                    UInt64.from(teamId)
                );
            });
            // Sign transaction 
            await tx.sign();
            // Send transaction
            await tx.send();
            // Check if the transaction is pending or not
            isPendingTransaction(tx.transaction);
            // Return transaction
            return tx.transaction;
        },
        async leaveTeam(client: Client, address: string, teamId: number) {
            // Get team
            const team = client.runtime.resolve("Team");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                team.leaveTeam(
                    UInt64.from(teamId)
                );
            });
            // Sign transaction 
            await tx.sign();
            // Send transaction
            await tx.send();
            // Check if the transaction is pending or not
            isPendingTransaction(tx.transaction);
            // Return transaction
            return tx.transaction;
        },
    }))
);

export const useObserveTeam = (teamId: number) => {
    // Get client
    const client = useClientStore();
    // Get chain
    const chain = useChainStore();
    // Get team
    const team = useTeamStore();
    // Get wallet
    const wallet = useWalletStore();

    return useEffect(() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // Get client team data
        team.getTeam(client.client, wallet.wallet, teamId);
    }, [client.client, chain.block?.height, wallet.wallet]);
};

export const useTeamNewTeam = () => {
    // Get client
    const client = useClientStore();
    // Get team
    const team = useteamStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await team.newTeam(client.client, wallet.wallet);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};

export const useTeamInvitePlayer = (playerAddress: string, teamId: number) => {
    // Get client
    const client = useClientStore();
    // Get team
    const team = useteamStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await team.invitePlayer(client.client, wallet.wallet, playerAddress, teamId);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};

export const useTeamAcceptInvitation = (teamId: number) => {
    // Get client
    const client = useClientStore();
    // Get team
    const team = useteamStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await team.acceptInvitation(client.client, wallet.wallet, teamId);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};

export const useTeamLeaveTeam = (teamId: number) => {
    // Get client
    const client = useClientStore();
    // Get team
    const team = useteamStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await team.leaveTeam(client.client, wallet.wallet, teamId);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};