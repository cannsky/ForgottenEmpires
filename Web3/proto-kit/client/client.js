// This code is not completed.
// This code is not audited.

import { 
    PendingTransaction, 
    UnsignedTransaction 
} from "@proto-kit/sequencer";

import {
    Field,
    PublicKey,
    Signature,
    UInt64
} from "o1js";

var pendingTransactions = [];

function addPendingTransaction(pendingTransaction) {
    pendingTransactions.push(pendingTransaction);
}

function removePendingTransaction(pendingTransaction) {
    pendingTransactions = pendingTransactions.filter((tx) => {
        return tx.hash().toString() !== pendingTransaction.hash().toString();
    });
}