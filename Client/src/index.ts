import { ReturnValue } from "./types";
import { createBuyPotionTx, createUsePotionTx, getAddress, sendTransaction } from "./utils";

export async function buyPotion(): Promise<ReturnValue<'potionBuy'>> {
    try {
        const address = await getAddress()

        const txAsJson = await createBuyPotionTx(address)

        await sendTransaction(txAsJson)

        return 'potionBuy:1'
    } catch (error) {
        if (error.code === 4001) return 'potionBuy:2'
        else return 'potionBuy:0'
    }
}

export async function usePotion(): Promise<ReturnValue<'potionUse'>> {
    try {
        const address = await getAddress()

        const txAsJson = await createUsePotionTx(address)

        await sendTransaction(txAsJson)

        return 'potionUse:1'
    } catch (error) {
        if (error.code === 4001) return 'potionUse:2'
        else return 'potionUse:0'
    }
}

export async function connectWallet(): Promise<ReturnValue<'wallet'>> {
    try {
        const address = await getAddress()
        return 'wallet:1'
    } catch (error) {
        if (error.code === 4001) return 'wallet:2'
        else return 'wallet:0'
    }
}