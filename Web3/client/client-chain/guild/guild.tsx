// This code is not completed.
// This code is not audited.

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Client, useClientStore } from "../../client";
import { PublicKey } from "o1js";
import { useCallback, useEffect } from "react";
import { GuildState } from "./interface";
import { PendingTransaction, UnsignedTransaction } from "@proto-kit/sequencer";
import { useWalletStore } from "../../wallet";
import { UInt64 } from "@proto-kit/library";
import { useChainStore } from "../../chain";

function isPendingTransaction(transaction: PendingTransaction | UnsignedTransaction | undefined) 
    : asserts transaction is PendingTransaction {
    if (!(transaction instanceof PendingTransaction)) throw new Error("Transaction is not a pending transaction");
}

export const useGuildStore = create<GuildState, [["zustand/immer", never]]>(
    immer((set) => ({
        loading: Boolean(false),
        guilds: {},
        async getPlayerGuild(client: Client, address: string) {
            set((state) => {
                state.loading = true;
            });
            // Get address
            const ownerAddress = PublicKey.fromBase58(address);
            // Get player guild id
            const clientPlayerGuildId = await client.query.runtime.Guild.playerGuilds.get(
                ownerAddress
            );
            // Get player guild
            const clientPlayerGuild = await client.query.runtime.Guild.guilds.get(
                UInt64.from(clientPlayerGuildId)
            );
            // Add player guild to guild
            set((state) => {
                state.loading = false;
                state.guilds[clientPlayerGuildId.toString()] = {
                    leader: clientPlayerGuild?.leader.toString(),
                    memberCount: clientPlayerGuild?.memberCount.toString()
                };
            });
        },
        async newGuild(client: Client, address: string) {
            // Get guild
            const guild = client.runtime.resolve("Guild");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                guild.newGuild();
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
        async joinGuild(client: Client, address: string, guildId: number) {
            // Get guild
            const guild = client.runtime.resolve("Guild");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                guild.newGuild(
                    UInt64.from(guildId)
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
        async leaveGuild(client: Client, address: string, guildId: number) {
            // Get guild
            const guild = client.runtime.resolve("Guild");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                guild.leaveGuild(
                    UInt64.from(guildId)
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

export const UseObserveGuild = () => {
    // Get client
    const client = useClientStore();
    // Get chain
    const chain = useChainStore();
    // Get guild
    const guild = useGetPlayerGuild();
    // Get wallet
    const wallet = useWalletStore();

    return useEffect(() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // Get client player guild data
        guild.getPlayerGuild(client.client, wallet.wallet);
    }, [client.client, chain.block?.height, wallet.wallet]);
};

export const useGuildNewGuild = () => {
    // Get client
    const client = useClientStore();
    // Get guild
    const guild = useGetPlayerGuild();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await guild.newGuild(client.client, wallet.wallet);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};

export const useGuildJoinGuild = (guildId: number) => {
    // Get client
    const client = useClientStore();
    // Get guild
    const guild = useGetPlayerGuild();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await guild.newGuild(client.client, wallet.wallet, guildId);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};

export const useGuildLeaveGuild = (guildId: number) => {
    // Get client
    const client = useClientStore();
    // Get guild
    const guild = useGetPlayerGuild();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await guild.newGuild(client.client, wallet.wallet, guildId);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};