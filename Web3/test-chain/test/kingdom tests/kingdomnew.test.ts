import { TestingAppChain } from "@proto-kit/sdk";

import { PrivateKey, UInt64 } from "o1js";

import { Player } from "../../player";

import { Kingdom } from "../../kingdom";

import { log } from "@proto-kit/common";

log.setLevel("error");

describe("Kingdom New Kingdom Test", () => {
    it("Tests kingdom new kingdom functionality", async () => {
        // Define appchain
        const appChain = TestingAppChain.fromRuntime({
            modules: {
                Player,
                Kingdom,
            },
            config: {
                Player: {},
                Kingdom: {},
            },
        });
        // Start appchain
        await appChain.Start();
        // Create a random private key
        const alicePrivateKey = PrivateKey.random();
        // Get public key of the private key
        const alice = alicePrivateKey.toPublicKey();
        // Set private key
        appChain.setSigner(alicePrivateKey);
        // Get Player
        const player = appChain.runtime.resolve("Player");
        // Get kingdom
        const kingdom = appChain.runtime.resolve("Kingdom");

        // CREATE A NEW PLAYER FOR TESTING

        // Create a new player for the key
        const startTX = await appChain.transaction(alice, () => {
            player.newPlayer();
        });
        // Sign the tx
        await startTX.sign();
        // Send the tx
        await startTX.send();
        // Produce block
        const blockStart = await appChain.produceBlock();
        // Get the level of the new character
        let startLevel = await appChain.query.runtime.Player.players.get(alice).value.level;
        // Expect block to be true
        expect(blockStart?.txs[0].status).toBe(true);
        // Expect start level to be 1
        expect(startLevel?.toBigInt()).toBe(1n);

        // TEST CREATE A NEW KINGDOM FOR THE PLAYER

        // Create a new kingdom for the player
        const tx1 = await appChain.transaction(alice, () => {
            kingdom.newKingdom();
        });
        // Sign the tx
        await tx1.sign();
        // Send the tx
        await tx1.send();
        // Produce block
        const block1 = await appChain.produceBlock();
        // Get the level of the new character
        let kingdomCount = await appChain.query.runtime.Kingdom.kingdomCount.get();
        // Expect block to be true
        expect(block1?.txs[0].status).toBe(true);
        // Expect kingdom count to be 1
        expect(kingdomCount?.toBigInt()).toBe(1n);
    });
});