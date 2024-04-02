// This code is not completed.
// This code is not audited.

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Client, useClientStore } from "../../client";
import { PublicKey, Struct, UInt32 } from "o1js";
import { useEffect, useCallback } from "react";
import { CharacterState } from "./interface";
import { PendingTransaction, UnsignedTransaction } from "@proto-kit/sequencer";
import { useWalletStore } from "../../wallet";

function isPendingTransaction(transaction: PendingTransaction | UnsignedTransaction | undefined) 
    : asserts transaction is PendingTransaction {
    if (!(transaction instanceof PendingTransaction)) throw new Error("Transaction is not a pending transaction");
}

export class CharacterKey extends Struct({
    owner: PublicKey,
    id: UInt32,
}) {}

export const usePlayerStore = create<CharacterState, [["zustand/immer", never]]>(
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
            const selectedCharacterId = UInt32.from(characterId);
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
                state.players[address] = { character: clientCharacter };
            });
        },
    }))
);