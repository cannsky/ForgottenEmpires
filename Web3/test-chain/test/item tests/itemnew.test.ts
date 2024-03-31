import { TestingAppChain } from "@proto-kit/sdk";

import { PrivateKey, UInt32 } from "o1js";

import { Player } from "../../player";

import { Item } from "../../item";

import { log } from "@proto-kit/common";

log.setLevel("error");

describe("Item New Item Test", () => {
    it("Tests item new item functionality", async () => {
        // Define appchain
        const appChain = TestingAppChain.fromRuntime({
            modules: {
                Player,
                Item,
            },
            config: {
                Player: {},
                Item: {},
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

        // CREATE A NEW PLAYER FOR TESTING

        // Create a new player for the key
        const startTX = await appChain.transaction(alice, () => {
            player.newPlayer(UInt64.from(0));
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

        // CREATE A NEW ITEM FOR TESTING

        // Create a new item for the player
        const tx1 = await appChain.transaction(alice, () => {
            item.newItem(UInt64.from(1));
        });
        // Sign the tx
        await tx1.sign();
        // Send the tx
        await tx1.send();
        // Produce block
        const block1 = await appChain.produceBlock();
        // Get type of the item created for the player
        let itemType = await appChain.query.runtime.Item.items.get(alice, UInt32.from(1)).value.type;
        // Expect block to be true
        expect(block1?.txs[0].status).toBe(true);
        // Expect item type to be 1
        expect(itemType?.toBigInt(1)).toBe(1n);
    });
});