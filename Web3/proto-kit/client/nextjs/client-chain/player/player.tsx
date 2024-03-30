// This code is not completed.
// This code is not audited.

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Client, useClientStore } from "../../client";
import { PublicKey } from "o1js";
import { useEffect, useState } from "react";
import { BlockQueryResponse, PlayerState } from "./interface";
import { PendingTransaction, UnsignedTransaction } from "@proto-kit/sequencer";

function isPendingTransaction(transaction: PendingTransaction | UnsignedTransaction | undefined) 
    : asserts transaction is PendingTransaction {
    if (!(transaction instanceof PendingTransaction)) throw new Error("Transaction is not a pending transaction");
}

export const usePlayerStore = create<PlayerState, [["zustand/immer", never]]>(
    immer((set) => ({
        loading: Boolean(false),
        async someFunc(client: Client, address: string) {
            set((state) => {
                state.loading = true;
            });

            // TODO IMPLEMENT HERE

            set((state) => {
                state.loading = false;
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

export const useNewPlayer = () => {
    // Get client
    const client = useClientStore();
    // Get player
    const player = usePlayerStore();
}