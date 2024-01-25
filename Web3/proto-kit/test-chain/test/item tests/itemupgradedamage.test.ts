import { TestingAppChain } from "@proto-kit/sdk";

import { PrivateKey, UInt32 } from "o1js";

import { Item, ItemKey } from "../../item";

import { log } from "@proto-kit/common";

log.setLevel("error");

describe("Item", () => {
    it("should demonstrate how item work", async () => {
        // Define appchain
        const appChain = TestingAppChain.fromRuntime({
            modules: {
                Item,
            },
            config: {
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
        // Get Item
        const item = appChain.runtime.resolve("Item");
        // Create a tx for testing
        const tx1 = await appChain.transaction(alice, () => {
            item.upgradeDamage(alice, UInt32.from(1));
        });
        // Sign the tx
        await tx1.sign();
        // Send the tx
        await tx1.send();
        // Produce block
        const block1 = await appChain.produceBlock();
        // Get the item
        let aliceItemDamage = await appChain.query.runtime.Item.items.get(new ItemKey( owner: alice, id: UInt32.from(1) })).value.damage;
        // Expect block to be true
        expect(block1?.txs[0].status).toBe(true);
        // Expect damage of the item to be 2
        expect(aliceItemDamage?.toBigInt()).toBe(2n);
    });
});