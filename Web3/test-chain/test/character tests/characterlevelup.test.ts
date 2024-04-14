import { TestingAppChain } from "@proto-kit/sdk";

import { PrivateKey } from "o1js";

import { UInt32 } from "@proto-kit/library";

import { Character, CharacterKey } from "../../src/character";

import { log } from "@proto-kit/common";

log.setLevel("error");

describe("Character Level Up Test", () => {
    it("Tests character level up functionality", async () => {
        // Define appchain
        const appChain = TestingAppChain.fromRuntime({
            modules: {
                Character,
            },
            config: {
                Character: {},
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
        // Get Character
        const character = appChain.runtime.resolve("Character");

        // CREATE A NEW CHARACTER FOR TESTING

        // Create a new character for the key
        const startTX = await appChain.transaction(alice, () => {
            character.newCharacter(UInt32.from(0));
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
            id: UInt32.from(1)
        });
        // Get the promise
        let startLevelPromise = await appChain.query.runtime.Character.characters.get(aliceCharacter);
        // Get the level of the new character
        let startLevel = await startLevelPromise?.level;
        // Expect block to be true
        expect(blockStart?.transactions[0].status.toBoolean()).toBe(true);
        // Expect start level to be 1
        expect(startLevel?.toBigInt()).toBe(1n);

        // TEST LEVEL UP

        // Create a tx for testing
        const tx1 = await appChain.transaction(alice, () => {
            character.levelUP(UInt32.from(1));
        });
        // Sign the tx
        await tx1.sign();
        // Send the tx
        await tx1.send();
        // Produce block
        const block1 = await appChain.produceBlock();
        // Get promise
        let aliceCharacterLevelPromise = await appChain.query.runtime.Character.characters.get(aliceCharacter);
        // Get the character leveled up
        let aliceCharacterLevel = await aliceCharacterLevelPromise?.level;
        // Expect block to be true
        expect(block1?.transactions[0].status.toBoolean()).toBe(true);
        // Expect character level to be 2
        expect(aliceCharacterLevel?.toBigInt()).toBe(2n);
    });
});