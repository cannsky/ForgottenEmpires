// This code is not completed.
// This code is not audited.

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Client, useClientStore } from "../../client";
import { PublicKey } from "o1js";
import { useCallback } from "react";
import { ItemState } from "./interface";
import { PendingTransaction, UnsignedTransaction } from "@proto-kit/sequencer";
import { useWalletStore } from "../../wallet";
import { UInt64 } from "@proto-kit/library";

export class ItemKey extends Struct({
    owner: PublicKey,
    id: UInt64,
}) {}

function isPendingTransaction(transaction: PendingTransaction | UnsignedTransaction | undefined) 
    : asserts transaction is PendingTransaction {
    if (!(transaction instanceof PendingTransaction)) throw new Error("Transaction is not a pending transaction");
}

export const useItemStore = create<ItemState, [["zustand/immer", never]]>(
    immer((set) => ({
        loading: Boolean(false),
        items: {},
        async getItem(client: Client, address: string, itemid: number) {
            set((state) => {
                state.loading = true;
            });
            // Get address
            const ownerAddress = PublicKey.fromBase58(address);
            // Get client player
            const item = await client.query.runtime.Item.items.get(
                new ItemKey({
                    owner: ownerAddress,
                    id: UInt64.from(itemid),
                })
            );
            set((state) => {
                state.loading = false;
                state.items[address][itemid] = { item: item };
            });
        },
        async newItem(client: Client, address: string, itemType: number) {
            // Get item
            const item = client.runtime.resolve("Item");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                item.newItem(
                    UInt64.from(itemType)
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
        async equipItem(client: Client, address: string, equipeditemslot: number, itemid: number) {
            // Get item
            const item = client.runtime.resolve("Item");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                item.equipItem(
                    UInt64.from(equipeditemslot),
                    UInt64.from(itemid)
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
        async unequipItem(client: Client, address: string, equipeditemslot: number) {
            // Get item
            const item = client.runtime.resolve("Item");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                item.unequipItem(
                    UInt64.from(equipeditemslot)
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
        async upgradeDamage(client: Client, address: string, itemid: number) {
            // Get item
            const item = client.runtime.resolve("Item");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                item.upgradeDamage(
                    UInt64.from(itemid)
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
        async upgradeDefense(client: Client, address: string, itemid: number) {
            // Get item
            const item = client.runtime.resolve("Item");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                item.upgradeDefense(
                    UInt64.from(itemid)
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
        async consumeItem(client: Client, address: string, itemid: number) {
            // Get item
            const item = client.runtime.resolve("Item");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                item.consumeItem(
                    UInt64.from(itemid)
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

export const useItemGetItem = () => {
    // Get client
    const client = useClientStore();
    // Get item
    const item = useItemStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await item.getItem(client.client, wallet.wallet);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};

export const useItemNewItem = () => {
    // Get client
    const client = useClientStore();
    // Get item
    const item = useItemStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await item.newItem(client.client, wallet.wallet);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};

export const useItemEquipItem = (equipeditemslot: number, itemid: number) => {
    // Get client
    const client = useClientStore();
    // Get item
    const item = useItemStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await item.equipItem(client.client, wallet.wallet, equipeditemslot, itemid);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};

export const useItemUnequipItem = (equipeditemslot: number) => {
    // Get client
    const client = useClientStore();
    // Get item
    const item = useItemStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await item.equipItem(client.client, wallet.wallet, equipeditemslot);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};

export const useItemUpgradeDamage = (itemid: number) => {
    // Get client
    const client = useClientStore();
    // Get item
    const item = useItemStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await item.upgradeDamage(client.client, wallet.wallet, itemid);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};

export const useItemUpgradeDefense = (itemid: number) => {
    // Get client
    const client = useClientStore();
    // Get item
    const item = useItemStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await item.upgradeDefense(client.client, wallet.wallet, itemid);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};

export const useItemConsumeItem = (itemid: number) => {
    // Get client
    const client = useClientStore();
    // Get item
    const item = useItemStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await item.consumeItem(client.client, wallet.wallet, itemid);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};