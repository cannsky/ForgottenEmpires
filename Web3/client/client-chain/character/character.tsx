// This code is not completed.
// This code is not audited.

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Client, useClientStore } from "../../client";
import { PublicKey, Struct } from "o1js";
import { useCallback, useEffect } from "react";
import { CharacterState } from "./interface";
import { PendingTransaction, UnsignedTransaction } from "@proto-kit/sequencer";
import { useWalletStore } from "../../wallet";
import { UInt64 } from "@proto-kit/library";
import { useChainStore } from "../../chain";

function isPendingTransaction(transaction: PendingTransaction | UnsignedTransaction | undefined) 
    : asserts transaction is PendingTransaction {
    if (!(transaction instanceof PendingTransaction)) throw new Error("Transaction is not a pending transaction");
}

export class CharacterKey extends Struct({
    owner: PublicKey,
    id: UInt64,
}) {}

export const useCharacterStore = create<CharacterState, [["zustand/immer", never]]>(
    immer((set) => ({
        loading: Boolean(false),
        characters: {},
        async getSelectedCharacter(client: Client, address: string, characterId: number) {
            set((state) => {
                state.loading = true;
            });
            // Get address
            const ownerAddress = PublicKey.fromBase58(address);
            // Get id
            const selectedCharacterId = UInt64.from(characterId);
            // Get client character
            const clientCharacter = await client.query.runtime.Character.characters.get(
                new CharacterKey({
                    owner: ownerAddress,
                    id: selectedCharacterId
                })
            );
            // Add client character to characters
            set((state) => {
                state.loading = false;
                state.characters[address] = {
                    level: clientCharacter?.level.toString(),
                    xp: clientCharacter?.xp.toString(), 
                    statxp: clientCharacter?.statxp.toString(), 
                    damage: clientCharacter?.damage.toString(), 
                    defense: clientCharacter?.defense.toString(), 
                    type: clientCharacter?.type.toString(), 
                    maxupgrade: clientCharacter?.maxupgrade.toString(),
                    maxlevel: clientCharacter?.maxlevel.toString(),
                    world: clientCharacter?.world.toString()
                };
            });
        },
        async newCharacter(client: Client, address: string, characterType: number) {
            // Get character
            const character = client.runtime.resolve("Character");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                character.newCharacter(
                    UInt64.from(characterType)
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
        async levelUP(client: Client, address: string, characterId: number) {
            // Get character
            const character = client.runtime.resolve("Character");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                character.levelUP(
                    UInt64.from(characterId)
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
        async upgradeDamage(client: Client, address: string, characterId: number) {
            // Get character
            const character = client.runtime.resolve("Character");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                character.upgradeDamage(
                    UInt64.from(characterId)
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
        async upgradeDefense(client: Client, address: string, characterId: number) {
            // Get character
            const character = client.runtime.resolve("Character");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                character.upgradeDefense(
                    UInt64.from(characterId)
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
        async upgradeMaxUpgrade(client: Client, address: string, characterId: number) {
            // Get character
            const character = client.runtime.resolve("Character");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                character.upgradeMaxUpgrade(
                    UInt64.from(characterId)
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
        async changeWorld(client: Client, address: string, characterId: number, worldId: number) {
            // Get character
            const character = client.runtime.resolve("Character");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                character.changeWorld(
                    UInt64.from(characterId), 
                    UInt64.from(worldId)
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

export const useObserveCharacter = (characterId: number) => {
    // Get client
    const client = useClientStore();
    // Get chain
    const chain = useChainStore();
    // Get character
    const character = useCharacterStore();
    // Get wallet
    const wallet = useWalletStore();

    return useEffect(() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // Get client character data
        character.getSelectedCharacter(client.client, wallet.wallet, characterId);
    }, [client.client, chain.block?.height, wallet.wallet]);
};

export const useCharacterNewCharacter = (characterType: number) => {
    // Get client
    const client = useClientStore();
    // Get character
    const character = useCharacterStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await character.newCharacter(client.client, wallet.wallet, characterType);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};

export const useCharacterLevelUP = (characterId: number) => {
    // Get client
    const client = useClientStore();
    // Get character
    const character = useCharacterStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await character.levelUP(client.client, wallet.wallet, characterId);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};

export const useCharacterUpgradeDamage = (characterId: number) => {
    // Get client
    const client = useClientStore();
    // Get character
    const character = useCharacterStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await character.upgradeDamage(client.client, wallet.wallet, characterId);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};

export const useCharacterUpgradeDefense = (characterId: number) => {
    // Get client
    const client = useClientStore();
    // Get character
    const character = useCharacterStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await character.upgradeDefense(client.client, wallet.wallet, characterId);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};

export const useCharacterUpgradeMaxUpgrade = (characterId: number) => {
    // Get client
    const client = useClientStore();
    // Get character
    const character = useCharacterStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await character.upgradeMaxUpgrade(client.client, wallet.wallet, characterId);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};

export const useCharacterChangeWorld = (characterId: number) => {
    // Get client
    const client = useClientStore();
    // Get character
    const character = useCharacterStore();
    // Get wallet
    const wallet = useWalletStore();

    return useCallback(async() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // New pending transaction
        const pendingTransaction = await character.changeWorld(client.client, wallet.wallet, characterId);
        // Add pending transaction to wallet
        wallet.addPendingTransaction(pendingTransaction);
    }, [client.client, wallet.wallet]);
};