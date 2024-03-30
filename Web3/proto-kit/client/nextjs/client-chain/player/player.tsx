// This code is not completed.
// This code is not audited.

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
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
        
    }))
)