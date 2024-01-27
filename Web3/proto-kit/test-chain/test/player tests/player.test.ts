import { TestingAppChain } from "@proto-kit/sdk";

import { PrivateKey, UInt64 } from "o1js";

import { Player } from "../../player";

import { log } from "@proto-kit/common";

log.setLevel("error");

describe("Player", () => {
    it("should demonstrate how player work", async () => {

        // THIS TEST WILL BE REMOVED

        const appChain = TestingAppChain.fromRuntime({
            modules: {
                Player,
            },
            config: {
                Player: {},
            },
        });

        await appChain.Start();

        const alicePrivateKey = PrivateKey.random();
        const alice = alicePrivateKey.toPublicKey();

        appChain.setSigner(alicePrivateKey);

        const player = appChain.runtime.resolve("Player");

        const tx2 = await appChain.transaction(alice, () => {
            player.addXP(UInt64.from(1));
        });

        await tx2.sign();
        await tx2.send();

        const block2 = await appChain.produceBlock();

        let aliceXP = await appChain.query.runtime.Player.players.get(alice).value.xp;

        expect(block2?.txs[0].status).toBe(true);

        expect(aliceXP?.toBigInt()).toBe(1n);
    });
});