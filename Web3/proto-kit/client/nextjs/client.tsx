// This code is not completed.
// This code is not audited.

import { client } from "chain";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ClientState } from "./interface";

export type Client = typeof client;

export const useClientStore = create<ClientState, [["zustand/immer", never]]>(
    immer((set) => ({
        loading: Boolean(false),
        async start() {
            set((state) => {
                state.loading = true;
            });

            await client.start();

            set((state) => {
                state.loading = false;
                state.client = client;
            });
        }
    }))
)