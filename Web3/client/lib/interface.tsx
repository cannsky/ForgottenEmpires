// This code is not completed.
// This code is not audited.

import { PendingTransaction, UnsignedTransaction } from "@proto-kit/sequencer";
import { Client } from "./chain";

export interface ComputedTransactionJSON {
    argFields: string[];
    argsJSON: string[];
    methodId: string;
    nonce: string;
    sender: string;
    signature: {
        r: string;
        s: string;
    }
}

export interface ComputedBlockJSON {
    txs?: {
        status: boolean;
        statusMessage?: string;
        tx: ComputedTransactionJSON;
    }[];
}

export interface ChainState {
    loading: boolean;
    block?: {
        height: string;
    } & ComputedBlockJSON;
    loadBlock: () => Promise<void>;
}

export interface ClientState {
    loading: boolean;
    client?: Client;
    start: () => Promise<void>;
}

export interface WalletState {
    wallet?: string;
    initializeWallet: () => Promise<void>;
    connectWallet: () => Promise<void>;
    observeWalletChange: () => void;
    pendingTransactions: PendingTransaction[];
    addPendingTransaction: (pendingTransaction: PendingTransaction) => void;
    removePendingTransaction: (PendingTransaction: PendingTransaction) => void;
}

export interface BlockQueryResponse {
    data: {
        network: {
            unproven?: {
                block: {
                    height: string;
                };
            };
        };
        block: ComputedTransactionJSON;
    };
}