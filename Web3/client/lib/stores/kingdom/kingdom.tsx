import { PendingTransaction, UnsignedTransaction } from "@proto-kit/sequencer";
import { useWalletStore } from "../wallet";
import { UInt64 } from "@proto-kit/library";
import { useChainStore } from "../chain";

function isPendingTransaction(transaction: PendingTransaction | UnsignedTransaction | undefined) 
    : asserts transaction is PendingTransaction {
    if (!(transaction instanceof PendingTransaction)) throw new Error("Transaction is not a pending transaction");
}

export const useGuildStore = create<KingdomState, [["zustand/immer", never]]>(
    immer((set) => ({
        loading: Boolean(false),
        guilds: {},
        async getPlayerKingdom(client: Client, address: string) {
            set((state) => {
                state.loading = true;
            });
            // Get address
            const ownerAddress = PublicKey.fromBase58(address);
            // Get player kingdom id
            const clientPlayerKingdomId = await client.query.runtime.Kingdom.playerKingdoms.get(
                ownerAddress
            );
            // Get player kingdom
            const clientPlayerKingdom = await client.query.runtime.Kingdom.kingdoms.get(
                UInt64.from(clientPlayerKingdomId ? clientPlayerKingdomId : 0)
            );
            // Add player guild to guild
            set((state) => {
                state.loading = false;
                state.kingdoms[(clientPlayerKingdomId ? clientPlayerKingdomId : 0).toString()] = {
                    leader: PublicKey.toBase58(clientPlayerKingdom?.leader),
                    memberCount: clientPlayerKingdom?.memberCount.toString(),
                    warid: clientPlayerKingdom?.warid.toString()
                };
            });
        },
        async newKingdom(client: Client, address: string) {
            // Get guild
            const kingdom = client.runtime.resolve("Kingdom");
            // Get public key of sender
            const sender = PublicKey.fromBase58(address);
            // Create transaction
            const tx = await client.transaction(sender, () => {
                kingdom.newKingdom();
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

export const UseObserveKingdom = () => {
    // Get client
    const client = useClientStore();
    // Get chain
    const chain = useChainStore();
    // Get guild
    const guild = useGuildStore();
    // Get wallet
    const wallet = useWalletStore();

    return useEffect(() => {
        // If client or wallet is not defined return
        if(!client.client || !wallet.wallet) return;
        // Get client player guild data
        guild.getPlayerGuild(client.client, wallet.wallet);
    }, [client.client, chain.block?.height, wallet.wallet]);
};