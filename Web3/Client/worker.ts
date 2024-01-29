
import { Game, CONTRACT_ADDR, o1js } from "contracts";
import { getMerkleWitnessAndPotionCount } from "./api";


/** The type that represents the state of the worker. */
type WorkerState =
    | {
        status: 'loaded'
    }
    | {
        status: 'compiled'
        TokenContractVerificationKey: {
            data: string;
            hash: o1js.Field;
        }
    }

/** The type that represents the methods of the worker. */
export type WorkerMethods = {
    ready: () => Promise<null>
    compileContract: () => Promise<undefined | null>
    buyPotion: (args: {
        signerPublicKey: string
    }) => Promise<undefined | {
        transaction: string
    }>
    usePotion: (args: {
        signerPublicKey: string
    }) => Promise<undefined | {
        transaction: string
    }>
}

/** The type that represents the requests that can be made to the worker. */
export type WorkerRequest = {
    [K in keyof WorkerMethods]: WorkerMethodParameters<K> extends [] ? {
        kind: K
    } : WorkerMethodParameters<K> extends [infer A] ? {
        kind: K
        args: A
    } : never
}[keyof WorkerMethods]

/** The type that represents the responses that can be made by the worker. */
export type WorkerResponse = {
    [K in keyof WorkerMethods]: {
        kind: K
        args: WorkerMethodReturnType<K>
    }
}[keyof WorkerMethods]

/** The type that represents the function that adds listener to given kind of worker responses. */
export type WorkerAddListener<T extends keyof WorkerMethods = keyof WorkerMethods> = (kind: T, args: WorkerResponseListener<T>) => void

/** The type that represents a listener to a worker response. Contains both `ok` and `err` case. */
export type WorkerResponseListener<T extends keyof WorkerMethods> = {
    ok: WorkerMethodReturnType<T> extends infer K ? K extends undefined ? never : K extends null ? () => Promise<void> : (args: K) => Promise<void> : never
    err: () => void
}

type WorkerMethodReturnType<T extends keyof WorkerMethods> = Awaited<ReturnType<WorkerMethods[T]>>
type WorkerMethodParameters<T extends keyof WorkerMethods> = Parameters<WorkerMethods[T]>


/** The type that represents the object that holds the handlers for each kind of worker responses. */
export type WorkerResponseHandlers = {
    [key in keyof WorkerMethods]: WorkerResponseListener<key>
}


/** The state of the worker. */
let workerState: WorkerState = {
    status: 'loaded',
}

/** The methods of the worker. */
const workerMethods: WorkerMethods = {
    ready: async () => null,
    compileContract: async () => {
        try {
            if (workerState.status !== 'loaded') return

            const { verificationKey } = await Game.compile()

            workerState = {
                status: 'compiled',
                TokenContractVerificationKey: verificationKey,
            }

            return null
        } catch (error) {
            console.error('Contract compilation inside the worker is failed.')
            console.error(error)
            return
        }
    },
    buyPotion: async (args) => {
        try {
            if (workerState.status !== 'compiled') {
                alert('Contract Not Compiled')
                return
            }

            o1js.Mina.setActiveInstance(o1js.Mina.Network('https://api.minascan.io/node/berkeley/v1/graphql'))

            const contractInstance = new Game(o1js.PublicKey.fromBase58(CONTRACT_ADDR))


            console.log('merklepath aliniyor')
            const { merkleWitness, userAccount } = await getMerkleWitnessAndPotionCount(args.signerPublicKey)
            const signer = o1js.PublicKey.fromBase58(args.signerPublicKey)

            console.log('tx olusturuluyor')
            const tx = await o1js.Mina.transaction(signer, () => {
                contractInstance.buyPotion(merkleWitness, userAccount)
            })

            console.log('proof olusturuluyor')

            await tx.prove()

            console.log('proof olusturuldu')

            return {
                transaction: tx.toJSON()
            }
        } catch (error) {
            console.error('Buying potion inside the worker is failed.')
            console.error(error)
            return
        }
    },

    usePotion: async (args) => {
        try {
            if (workerState.status !== 'compiled') {
                alert('Contract Not Compiled')
                return
            }

            o1js.Mina.setActiveInstance(o1js.Mina.Network('https://api.minascan.io/node/berkeley/v1/graphql'))

            const contractInstance = new Game(o1js.PublicKey.fromBase58(CONTRACT_ADDR))


            const { merkleWitness, userAccount } = await getMerkleWitnessAndPotionCount(args.signerPublicKey)
            const signer = o1js.PublicKey.fromBase58(args.signerPublicKey)

            const tx = await o1js.Mina.transaction(signer, () => {
                contractInstance.usePotion(merkleWitness, userAccount)
            })

            await tx.prove()

            return {
                transaction: tx.toJSON()
            }
        } catch (error) {
            console.error('Buying potion inside the worker is failed.')
            console.error(error)
            return
        }
    }
}

addEventListener('message', async (event: MessageEvent<WorkerRequest>) => {
    switch (event.data.kind) {
        case 'buyPotion':
            postMessage({
                kind: 'buyPotion',
                args: await workerMethods.buyPotion(event.data.args),
            } satisfies WorkerResponse)
            break
        case 'compileContract':
            postMessage({
                kind: 'compileContract',
                args: await workerMethods.compileContract(),
            } satisfies WorkerResponse)
            break
        case 'usePotion':
            postMessage({
                kind: 'usePotion',
                args: await workerMethods.usePotion(event.data.args)
            } satisfies WorkerResponse)
            break
        default:
            console.error('Worker received mistaken message', JSON.stringify(event.data))
    }
})

console.log('The worker is successfully started.')

postMessage({
    kind: 'ready',
    args: await workerMethods.ready()
} satisfies WorkerResponse)

console.log('worker basladi')