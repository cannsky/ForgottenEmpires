import { TestingAppChain } from "@proto-kit/sdk";

import { PrivateKey } from "o1js";

import { Player } from "../../src/player";

import { log } from "@proto-kit/common";

log.setLevel("error");

describe("Player Increase Bravery Test", () => {
    it("Tests player increase bravery functionality", async () => {
        // Define appchain
        const appChain = TestingAppChain.fromRuntime({
            Player,
        });
        // Configure
        appChain.configurePartial({
            Runtime: {
                Player: {},
            }
        });

        // Start appchain
        await appChain.start();
        // Create a random private key
        const alicePrivateKey = PrivateKey.random();
        // Get public key of the private key
        const alice = alicePrivateKey.toPublicKey();
        // Set private key
        appChain.setSigner(alicePrivateKey);
        // Get Player
        const player = appChain.runtime.resolve("Player");

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
        // Get the promise
        let startLevelPromise = await appChain.query.runtime.Player.players.get(alice);
        // Get the level of the new character
        let startLevel = await startLevelPromise?.level;
        // Expect block to be true
        expect(blockStart?.transactions[0].status.toBoolean()).toBe(true);
        // Expect start level to be 1
        expect(startLevel?.toBigInt()).toBe(1n);

        // TEST PLAYER INCREASE BRAVERY

        // Create a tx for increase bravery testing
        const tx1 = await appChain.transaction(alice, () => {
            player.increaseBravery();
        });
        // Sign the tx
        await tx1.sign();
        // Send the tx
        await tx1.send();
        // Produce block
        const block1 = await appChain.produceBlock();
        // Get the promise
        let aliceBraveryPromise = await appChain.query.runtime.Player.playerStats.get(alice);
        // Get the level upgraded
        let aliceBravery = await aliceBraveryPromise?.bravery;
        // Expect block to be true
        expect(block1?.transactions[0].status.toBoolean()).toBe(true);
        // Expect player level to be 2
        expect(aliceBravery?.toBigInt()).toBe(2n);
    });
});