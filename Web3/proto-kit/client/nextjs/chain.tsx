// This code is not completed.
// This code is not audited.

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useEffect, useState } from "react";
import { BlockQueryResponse } from "./interface";

export const useChainStore = create<ChainState, [["zustand/immer", never]]>(
    immer((set) => ({
        loading: Boolean(false),
        async loadBlock() {

            set((state) => {
                state.loading = true;
            });

            const response = await fetch("http://localhost:8080/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `
                        query GetBlock {
                            block {
                                txs {
                                    tx {
                                        argsFields
                                        argsJSON
                                        methodId
                                        nonce
                                        sender
                                        signature {
                                            r
                                            s
                                        }
                                        status
                                        statusMessage
                                    }
                                }
                                network {
                                    unproven {
                                        block {
                                            height
                                        }
                                    }
                                }
                            }
                        }
                    `,
                }),
            });

            const { data } = (await response.json()) as BlockQueryResponse;
            
            set((state) => {
                state.loading = false;

                state.block = data.network.unproven ? {
                    height: data.network.unproven.block.height,
                    ...data.block,
                }
                : undefined;
            });
        }
    }))
);

export const tickInterval = 1000;

export const usePollBlockHeight = () => {
    
    const[tick, setTick] = useState(0);

    const chain = useChainStore();

    useEffect(() => {
        chain.loadBlock();
    }, [tick]);

    useEffect(() => {
        const intervalId = setInterval(() => setTick((tick) => tick + 1), tickInterval);

        setTick((tick) => tick + 1);

        return () => clearInterval(intervalId);
    }, []);
};