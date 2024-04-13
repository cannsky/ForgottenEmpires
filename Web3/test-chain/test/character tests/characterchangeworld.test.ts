import { TestingAppChain } from "@proto-kit/sdk";

import { PrivateKey, UInt32 } from "o1js";

import { Character, CharacterKey } from "../../character";

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

        // TEST CHANGE WORLD

        // Create a tx for testing
        const tx1 = await appChain.transaction(alice, () => {
            character.changeWorld(UInt32.from(1));
        });
        // Sign the tx
        await tx1.sign();
        // Send the tx
        await tx1.send();
        // Produce block
        const block1 = await appChain.produceBlock();
        // Get promise
        let aliceCharacterWorldPromise = await appChain.query.runtime.Character.characters.get(aliceCharacter);
        // Get character world
        let aliceCharacterWorld = aliceCharacterWorldPromise?.world;
        // Expect block to be true
        expect(block1?.transactions[0].status.toBoolean()).toBe(true);
        // Expect character world to be 1
        expect(aliceCharacterWorld?.toBigInt()).toBe(1n);
    });
});