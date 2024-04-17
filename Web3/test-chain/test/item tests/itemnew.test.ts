import { TestingAppChain } from "@proto-kit/sdk";

import { UInt64 } from "@proto-kit/library";

import { PrivateKey } from "o1js";

import { Player } from "../../src/player";

import { Item, ItemKey } from "../../src/item";

import { log } from "@proto-kit/common";

log.setLevel("error");

describe("Item New Item Test", () => {
    it("Tests item new item functionality", async () => {
        // Define appchain
        const appChain = TestingAppChain.fromRuntime({
            Player,
            Item,
        });
        // Configure
        appChain.configurePartial({
            Runtime: {
                Player: {},
                Item: {}
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
        // Get item
        const item = appChain.runtime.resolve("Item");

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
        // New item key
        const itemKey = new ItemKey({
            owner: alice,
            id: UInt64.from(1)
        });
        // Get item type promise
        let itemTypePromise = await appChain.query.runtime.Item.items.get(itemKey);
        // Get type of the item created for the player
        let itemType = await itemTypePromise?.type;
        // Expect block to be true
        expect(block1?.transactions[0].status.toBoolean()).toBe(true);
        // Expect item type to be 1
        expect(itemType?.toBigInt()).toBe(1n);
    });
});