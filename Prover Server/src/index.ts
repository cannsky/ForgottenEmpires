import { CONTRACT_ADDR, Game, o1js } from 'contracts'

import { Storage } from './storage'
import { IncomingMessage, createServer } from 'http'

const PORT = 4321

const network = o1js.Mina.Network({
    mina: "https://proxy.berkeley.minaexplorer.com/graphql",
    archive: "https://archive.berkeley.minaexplorer.com",
})
o1js.Mina.setActiveInstance(network)

export const gameContract = new Game(o1js.PublicKey.fromBase58(CONTRACT_ADDR))

const storage = new Storage()

createServer(async (req, res) => {
    if (req.url !== '/get-merkle-witness-and-potion-count') {
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
        res.end(JSON.stringify(storage.users))
        return
    }

    if (req.method !== 'POST') {
        res.writeHead(400)
        res.end('ONLY POST METHOD IS ALLOWED')
        return
    }

    const publicKey = await getReqData(req)

    console.log(publicKey)

    if (typeof publicKey !== 'string' || publicKey.length !== 55) {
        res.writeHead(400)
        res.end('ONLY SENDING BASE58 ENCODED PUBLIC KEY IS ALLOWED')
        return
    }



    const result = storage.getMerkleWitnessAndPotionCount(publicKey)

    console.log(result)

    if (result === null) {
        res.writeHead(400)
        res.end('INTERNAL SERVER ERROR')
        return
    }


    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    res.end(JSON.stringify({
        merkleWitness: result.merkleWitness,
        potionCount: result.potionCount,
    }))

}).listen(PORT, () => {
    console.log(`server is up and running on port: ${PORT}`)
})


function getReqData(req: IncomingMessage) {
    return new Promise<string>((resolve, reject) => {
        try {
            //fix
            let body = "";
            // listen to data sent by client
            req.on("data", (chunk) => {
                // append the string version to the body
                body += chunk.toString();
            });
            // listen till the end
            req.on("end", () => {
                // send back the data
                const bodyAsString = body.slice(1, -1)
                resolve(bodyAsString);
            });
        } catch (error) {
            reject(error);
        }
    });
}

