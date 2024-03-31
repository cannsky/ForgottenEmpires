// This code is not completed.
// This code is not audited.

import { WalletState } from "./interface";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { PendingTransaction, UnsignedTransaction } from "@proto-kit/sequencer";
import { useChainStore } from "./chain";
import { useClientStore } from "./client";
import { useCallback, useEffect, useMemo } from "react";
import { MethodIdResolver } from "@proto-kit/module"
import truncateMiddle from "truncate-middle";
import { Field, UInt64, PublicKey, Signature, Bool } from "o1js";

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

export const useNotifyTransactions = () => {
    const wallet = useWalletStore();
    const chain = useChainStore();
    const client = useClientStore();

    const previousPendingTransactions = usePrevious(wallet.pendingTransactions);

    const newPendingTransactions = useMemo(() => {
        return wallet.pendingTransactions.filter(
            (pendingTransaction) => !(previousPendingTransactions ?? []).includes(pendingTransaction)
        );
    }, [wallet.pendingTransactions, previousPendingTransactions]);

    const notifyTransaction = useCallback(
    (
        status: "PENDING" | "SUCCESS" | "FAILURE",
        transaction: UnsignedTransaction, PendingTransaction
    ) => {
        if(!client.client) return;

        const methodIdResolver = client.client.resolveOrFail("MethodIdResolver", MethodIdResolver);

        const resolvedMethodDetails = methodIdResolver.getMethodNameFromId(transaction.methodId.toBigInt());

        if (!resolvedMethodDetails) throw new Error("Unable to resolve method details");

        const [moduleName, methodName] = resolvedMethodDetails;

        const hash = truncateMiddle(transaction.hash().toString(), 15, 15, "...");

        function title() {
            switch (status) {
                case "PENDING":
                    return `Transaction sent: ${moduleName}, ${methodName}`;
                case "SUCCESS":
                    return `Transaction successful: ${moduleName}, ${methodName}`;
                case "FAILURE":
                    return `Transaction failed: ${moduleName}, ${methodName}`;
            }
        }

        console.log(title());
    }, [client.client]);

    useEffect(() => {
        // Notify pending transaction
        newPendingTransactions.forEach((pendingTransaction) => { notifyTransaction("PENDING", pendingTransaction); });
    }, [newPendingTransactions, notifyTransaction]);

    useEffect(() => {
        const confirmedTransactions = chain.block?.txs?.map(
            ({ tx, status, statusMessage}) => {
                return {
                    tx: new PendingTransaction({
                        methodId: Field(tx.methodId),
                        nonce: UInt64.from(tx.nonce),
                        isMessage: false,
                        sender: PublicKey.fromBase58(tx.sender),
                        argsFields: tx.argsFields.map((arg) => Field(arg)),
                        argsJSON: tx.argsJSON,
                        signature: Signature.fromJSON({
                            r: tx.signature.r,
                            s: tx.signature.s,
                        })
                    }),
                    status,
                    statusMessage
                };
            }
        );

        const confirmedPendingTransactions = confirmedTransactions?.filter(
            ({ tx }) => {
                return wallet.pendingTransactions?.find((pendingTransaction) => {
                    return pendingTransaction.hash().toString() === tx.hash().toString();
                });
            }
        );

        confirmedPendingTransactions?.forEach(({ tx, status }) => {
            wallet.removePendingTransaction(tx);
            notifyTransaction(status ? "SUCCESS" : "FAILURE", tx);
        });
    }, [chain.block, wallet.pendingTransaction, client.client, notifyTransaction]);
};