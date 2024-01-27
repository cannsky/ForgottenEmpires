import { TestingAppChain } from "@proto-kit/sdk";

import { PrivateKey, UInt32 } from "o1js";

import { Character, CharacterKey } from "../../character";

import { log } from "@proto-kit/common";

log.setLevel("error");

describe("Item", () => {
    it("should demonstrate how character work", async () => {
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
        // Create a tx for testing
        const tx1 = await appChain.transaction(alice, () => {
            character.levelUp(UInt32.from(1));
        });
        // Sign the tx
        await tx1.sign();
        // Send the tx
        await tx1.send();
        // Produce block
        const block1 = await appChain.produceBlock();
        // Get the character leveled up
        let aliceCharacterLevel = await appChain.query.runtime.Character.characters.get(new CharacterKey({ owner: alice, id: UInt32.from(1) })).value.level;
        // Expect block to be true
        expect(block1?.txs[0].status).toBe(true);
        // Expect character level to be 2
        expect(aliceCharacterLevel?.toBigInt()).toBe(2n);
    });
});