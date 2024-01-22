import { TestingAppChain } from "@proto-kit/sdk";

import { PrivateKey, UInt32 } from "o1js";

import { Item, EquippedItemKey } from "../item";

import { log } from "@proto-kit/common";

log.setLevel("error");

describe("Item", () => {
    it("should demonstrate how item work", async () => {
        const appChain = TestingAppChain.fromRuntime({
            modules: {
                Item,
            },
            config: {
                Item: {},
            },
        });

        await appChain.Start();

        const alicePrivateKey = PrivateKey.random();
        const alice = alicePrivateKey.toPublicKey();

        appChain.setSigner(alicePrivateKey);

        const item = appChain.runtime.resolve("Item");

        const tx1 = await appChain.transaction(alice, () => {
            item.equipItem(alice, UInt32.from(1), UInt32.from(1));
        });

        await tx1.sign();
        await tx1.send();

        const block1 = await appChain.produceBlock();

        let aliceItem = await appChain.query.runtime.Item.items.get(new EquippedItemKey( owner: alice, slot: UInt32.from(1) })).value.itemid;

        expect(block1?.txs[0].status).toBe(true);

        expect(aliceXP?.toBigInt()).toBe(1n);
    });
});