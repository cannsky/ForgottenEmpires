// This code is not completed.
// This code is not audited.

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