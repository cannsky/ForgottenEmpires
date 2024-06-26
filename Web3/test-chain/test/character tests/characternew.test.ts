import { TestingAppChain } from "@proto-kit/sdk";

import { UInt64 } from "@proto-kit/library";

import { PrivateKey } from "o1js";

import { Character, CharacterKey } from "../../src/character";

import { log } from "@proto-kit/common";

log.setLevel("error");

describe("Character New Character Test", () => {
    it("Tests character new character functionality", async () => {
        // Define appchain
        const appChain = TestingAppChain.fromRuntime({
            Character,
        });
        // Configure
        appChain.configurePartial({
            Runtime: {
                Character: {},
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
        // Get Character
        const character = appChain.runtime.resolve("Character");

        // CREATE A NEW CHARACTER FOR TESTING

        // Create a new character for the key
        const startTX = await appChain.transaction(alice, () => {
            character.newCharacter(UInt64.from(0));
        });
        // Sign the tx
        await startTX.sign();
        // Send the tx
        await startTX.send();
        // Produce block
        const blockStart = await appChain.produceBlock();
        // Create a new character key
        const aliceCharacter = new CharacterKey({ 
            owner: alice, 
            id: UInt64.from(1)
        });
        // Get the promise
        let startLevelPromise = await appChain.query.runtime.Character.characters.get(aliceCharacter);
        // Get the level of the new character
        let startLevel = await startLevelPromise?.level;
        // Expect block to be true
        expect(blockStart?.transactions[0].status.toBoolean()).toBe(true);
        // Expect start level to be 1
        expect(startLevel?.toBigInt()).toBe(1n);
    });
});