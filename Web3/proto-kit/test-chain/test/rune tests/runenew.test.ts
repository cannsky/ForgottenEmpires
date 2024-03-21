import { TestingAppChain } from "@proto-kit/sdk";

import { PrivateKey, UInt64 } from "o1js";

import { Player } from "../../player";

import { Rune } from "../../rune";

import { log } from "@proto-kit/common";

log.setLevel("error");

describe("Rune New Player Rune Stats Test", () => {
    it("Tests rune new player rune stats functionality", async () => {
        // Define appchain
        const appChain = TestingAppChain.fromRuntime({
            modules: {
                Player,
                Rune,
            }
        });
        // Configure
        appChain.configurePartial({
            Runtime: {
                Player: {},
                Rune: {},
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
        // Get Rune
        const rune = appChain.runtime.resolve("Rune");

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

        // CREATE A NEW RUNE

        // Create a new rune for the player
        const tx1 = await appChain.transaction(alice, () => {
            rune.newPlayerRuneStats();
        });
        // Sign the tx
        await tx1.sign();
        // Send the tx
        await tx1.send();
        // Produce block
        const block1 = await appChain.produceBlock();
        // Get max level
        let maxLevel = await appChain.query.runtime.Rune.playerRunes.get(alice).value.maxrunelevel;
        // Expect block to be true
        expect(block1?.transactions[0].status.toBoolean()).toBe(true);
        // Expect max level to be 10
        expect(maxLevel?.toBigInt()).toBe(10n);
    });
});