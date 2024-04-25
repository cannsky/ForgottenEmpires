// This code is not completed.
// This code is not audited.

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Client, useClientStore } from "../../client";
import { PublicKey } from "o1js";
import { useCallback, useEffect } from "react";
import { PlayerState } from "./interface";
import { PendingTransaction, UnsignedTransaction } from "@proto-kit/sequencer";
import { useWalletStore } from "../../wallet";
import { useChainStore } from "../../chain";

function isPendingTransaction(transaction: PendingTransaction | UnsignedTransaction | undefined) 
    : asserts transaction is PendingTransaction {
    if (!(transaction instanceof PendingTransaction)) throw new Error("Transaction is not a pending transaction");
}

export const usePlayerStore = create<PlayerState, [["zustand/immer", never]]>(
    immer((set) => ({
        loading: Boolean(false),
        players: {},
        playerStats: {},
        async login(client: Client, address: string) {
            set((state) => {
                state.loading = true;
            });
            // Get client player
            const clientPlayer = await client.query.runtime.Player.players.get(PublicKey.fromBase58(address));
            // Get client player stats
            const clientPlayerStats = await client.query.runtime.Player.playerStats.get(PublicKey.fromBase58(address));
            // Add client player and player stats to players
            set((state) => {
                state.loading = false;
                state.players[address] = { 
                    level: clientPlayer?.level.toString(), 
                    playerStats: clientPlayer?.xp.toString() 
                };
                state.playerStats[address] = { 
                    charisma: clientPlayerStats?.charisma.toString(), 
                    reputation: clientPlayerStats?.reputation.toString(),
                    maxupgrade: clientPlayerStats?.maxupgrade.toString(),
                    leadership: clientPlayerStats?.leadership.toString(),
                    bravery: clientPlayerStats?.bravery.toString()
                };
            });
        },
        async newPlayer(client: Client, address: string) {
            // Get player
            const player = client.runtime.resolve("Player");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                player.newPlayer();
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
        async levelUp(client: Client, address: string) {
            // Get player
            const player = client.runtime.resolve("Player");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                player.levelUp();
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
        async increaseLeadership(client: Client, address: string) {
            // Get player
            const player = client.runtime.resolve("Player");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                player.increaseLeadership();
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
        async increaseBravery(client: Client, address: string) {
            // Get player
            const player = client.runtime.resolve("Player");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                player.increaseBravery();
            });
            // Sign transaction 
            await tx.sign();
            // Send transaction
            await tx.send();
            // Check if the transaction is pending or not
            isPendingTransaction(tx.transaction);
            // Return transaction
            return tx.transaction;
        }
    }))
);

export const useObservePlayer = () => {
    // Get client
    const client = useClientStore();
    // Get chain
    const chain = useChainStore();
    // Get player
    const player = usePlayerStore();
    // Get wallet
    const wallet = useWalletStore();

    return useEffect(() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // Get client player data
        player.login(client.client, wallet.wallet);
    }, [client.client, chain.block?.height, wallet.wallet]);
};

export const usePlayerNewPlayer = () => {
    // Get client
    const client = useClientStore();
    // Get player
    const player = usePlayerStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await player.newPlayer(client.client, wallet.wallet);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};

export const usePlayerLevelUp = () => {
    // Get client
    const client = useClientStore();
    // Get player
    const player = usePlayerStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await player.levelUp(client.client, wallet.wallet);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};

export const usePlayerIncreaseLeadership = () => {
    // Get client
    const client = useClientStore();
    // Get player
    const player = usePlayerStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await player.increaseLeadership(client.client, wallet.wallet);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};

export const usePlayerIncreaseBravery = () => {
    // Get client
    const client = useClientStore();
    // Get player
    const player = usePlayerStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await player.increaseBravery(client.client, wallet.wallet);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};