import { TestingAppChain } from "@proto-kit/sdk";

import { PrivateKey, UInt64 } from "o1js";

import { Player } from "../../player";

import { log } from "@proto-kit/common";

log.setLevel("error");

describe("Player", () => {
    it("should demonstrate how player work", async () => {
        // Define appchain
        const appChain = TestingAppChain.fromRuntime({
            modules: {
                Player,
            },
            config: {
                Player: {},
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
        // Create a tx for testing
        const tx1 = await appChain.transaction(alice, () => {
            player.changeKingdom(UInt64.from(1));
        });
        // Sign the tx
        await tx1.sign();
        // Send the tx
        await tx1.send();
        // Produce block
        const block1 = await appChain.produceBlock();
        // Get the kingdom changed
        let aliceKingdom = await appChain.query.runtime.Player.players.get(alice).value.kingdom;
        // Expect block to be true
        expect(block1?.txs[0].status).toBe(true);
        // Expect player kingdom to be 1
        expect(aliceKingdom?.toBigInt()).toBe(1n);
    });
});