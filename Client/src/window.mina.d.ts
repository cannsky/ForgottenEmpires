// I extend the type of `window` to have type safety while accessing `window.mina`.
declare interface Window {
    /** 
     * The object Auro Wallet injects to allow websites to interact.
     * 
     * Learn more: https://docs.aurowallet.com/general/ 
     */
    mina?: {
        /** Makes a request to connect wallet and returns an array of addresses. Throws if user rejects. */
        requestAccounts(): Promise<Array<string>>

        /** Makes a request to connect wallet and returns an array of addresses. Sends an empty array if user rejects. */
        getAccounts(): Promise<Array<string>>

        /** Returns the name of the selected network. */
        requestNetwork(): Promise<'Mainnet' | 'Devnet' | 'Berkeley' | 'Testworld2' | 'Unknown'>

        /** Makes a request to send a transaction. Returns its hash. Parameter `transaction` is JSON representation of the transaction. */
        sendTransaction(params: {
            transaction: string,
            feePayer?: {
                fee?: number,
                memo?: string
            }
        }): Promise<{ hash: string }>

        /** Makes a request to sign the given message. */
        signMessage(params: { message: string }): Promise<{
            publicKey: string
            data: string
            signature: {
                field: string
                scalar: string
            }
        }>

        /** Verifies the given signed message. Returns `true`/`false` based on the verification. */
        verifyMessage(params: {
            publicKey: string
            payload: string
            signature: {
                field: string
                scalar: string
            }
        }): Promise<boolean>

        /** Makes a request to sign the given fields. Fields must be converted to string before signing. */
        signFields(params: { message: Array<string> }): Promise<{
            data: Array<string>
            signature: string
        }>

        /** Verifies the given signed fields. Returns `true`/`false` based on the verification. */
        verifyFields(params: {
            publicKey: string
            payload: Array<string>
            signature: {
                field: string
                scalar: string
            }
        }): Promise<boolean>

        /** Adds event listener for specified event using given handler. Currently only `accountsChanged` & `chainChanged` are supported. */
        on<T extends 'accountsChanged' | 'chainChanged'>(eventName: T, handler: (params: T extends 'accountsChanged' ? Array<string> : T extends 'chainChanged' ? string : never) => void): void

        /** Removes all the listeners added using `window.mina.on` function. */
        removeAllListeners(): void
    }
}