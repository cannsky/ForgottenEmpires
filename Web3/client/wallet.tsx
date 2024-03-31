// This code is not completed.
// This code is not audited.

import { WalletState } from "./interface";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { PendingTransaction, UnsignedTransaction } from "@proto-kit/sequencer";

export const useWalletStore = create<WalletState, [["zustand/immer", never]]>(
    immer((set) => ({
        async initializeWallet() {
            if (typeof mina == "undefined") throw new Error("Auro wallet not installed");

            const [wallet] = await mina.getAccounts();

            set((state) => {
                state.wallet = wallet;
            });
        },
        async connectWallet() {
            if (typeof mina == "undefined") throw new Error("Auro wallet not installed");

            const [wallet] = await mina.requestAccounts();

            set((state) => {
                state.wallet = wallet;
            });
        },
        async observeWalletChange() {
            if (typeof mina == "undefined") throw new Error("Auro wallet not installed");
            
            mina.on("accountsChanged", ([wallet]) => {
                set((state) => {
                    state.wallet = wallet;
                });
            });
        },
        pendingTransactions: [] as PendingTransaction[],
        addPendingTransaction(pendingTransaction) {
            set((state) => {
                state.pendingTransactions.push(pendingTransaction)
            });
        },
        removePendingTransaction(pendingTransaction) {
            set((state) => {
                state.pendingTransactions = state.pendingTransactions.filter((tx) => {
                    return tx.hash().toString() !== pendingTransaction.hash().toString();
                });
            });
        }
    }))
);