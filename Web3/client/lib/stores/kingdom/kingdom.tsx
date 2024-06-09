import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Client, useClientStore } from "../client";
import { PublicKey } from "o1js";
import { useCallback, useEffect } from "react";
import { KingdomState } from "./interface";
import { PendingTransaction, UnsignedTransaction } from "@proto-kit/sequencer";
import { useWalletStore } from "../wallet";
import { UInt64 } from "@proto-kit/library";
import { useChainStore } from "../chain";

function isPendingTransaction(transaction: PendingTransaction | UnsignedTransaction | undefined) 
    : asserts transaction is PendingTransaction {
    if (!(transaction instanceof PendingTransaction)) throw new Error("Transaction is not a pending transaction");
}

export const useGuildStore = create<KingdomState, [["zustand/immer", never]]>(
    immer((set) => ({
        loading: Boolean(false),
        guilds: {},
        async getPlayerKingdom(client: Client, address: string) {
            set((state) => {
                state.loading = true;
            });
            // Get address
            const ownerAddress = PublicKey.fromBase58(address);
            // Get player kingdom id
            const clientPlayerKingdomId = await client.query.runtime.Kingdom.playerKingdoms.get(
                ownerAddress
            );
            // Get player kingdom
            const clientPlayerKingdom = await client.query.runtime.Kingdom.kingdoms.get(
                UInt64.from(clientPlayerKingdomId ? clientPlayerKingdomId : 0)
            );
            // Add player kingdom to kingdom
            set((state) => {
                state.loading = false;
                state.kingdoms[(clientPlayerKingdomId ? clientPlayerKingdomId : 0).toString()] = {
                    leader: PublicKey.toBase58(clientPlayerKingdom?.leader),
                    memberCount: clientPlayerKingdom?.memberCount.toString(),
                    warid: clientPlayerKingdom?.warid.toString()
                };
            });
        },
        async changeKingdom(client: Client, address: string, kingdomId: number) {
            // Get kingdom
            const kingdom = client.runtime.resolve("Kingdom");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                kingdom.changeKingdom(
                    UInt64.from(kingdomId)
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
        async newWarRequest(client: Client, address: string, kingdomId: number) {
            // Get kingdom
            const kingdom = client.runtime.resolve("Kingdom");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                kingdom.newWarRequest(
                    UInt64.from(kingdomId)
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
        async newPeaceRequest(client: Client, address: string, warId: number) {
            // Get kingdom
            const kingdom = client.runtime.resolve("Kingdom");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                kingdom.newPeaceRequest(
                    UInt64.from(warId)
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
        async favorWarRequest(client: Client, address: string, warRequestId: number, voteCount: number) {
            // Get kingdom
            const kingdom = client.runtime.resolve("Kingdom");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                kingdom.favorWarRequest(
                    UInt64.from(warRequestId),
                    UInt64.from(voteCount)
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
        async favorPeaceRequest(client: Client, address: string, peaceRequestId: number, voteCount: number) {
            // Get kingdom
            const kingdom = client.runtime.resolve("Kingdom");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                kingdom.favorPeaceRequest(
                    UInt64.from(peaceRequestId),
                    UInt64.from(voteCount)
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

export const UseObserveKingdom = () => {
    // Get client
    const client = useClientStore();
    // Get chain
    const chain = useChainStore();
    // Get guild
    const guild = useGuildStore();
    // Get wallet
    const wallet = useWalletStore();

    return useEffect(() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // Get client player guild data
        guild.getPlayerGuild(client.client, wallet.wallet);
    }, [client.client, chain.block?.height, wallet.wallet]);
};