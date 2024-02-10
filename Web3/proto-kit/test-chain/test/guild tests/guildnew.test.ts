import { TestingAppChain } from "@proto-kit/sdk";

import { PrivateKey, UInt64 } from "o1js";

import { Player } from "../../player";

import { Guild } from "../../guild";

import { log } from "@proto-kit/common";

log.setLevel("error");

describe("Guild New Guild Test", () => {
    it("Tests guild new guild functionality", async () => {
        // Define appchain
        const appChain = TestingAppChain.fromRuntime({
            modules: {
                Player,
                Guild,
            },
            config: {
                Player: {},
                Guild: {},
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
        const guild = appChain.runtime.resolve("Guild");

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

        // CREATE A NEW GUILD FOR THE GIVEN PLAYER

        // Create a new guild
        const tx1 = await appChain.transaction(alice, () => {
            guild.newGuild();
        });
        // Sign the tx
        await tx1.sign();
        // Send the tx
        await tx1.send();
        // Produce block
        const block1 = await appChain.produceBlock();
        // Get the guild count
        let guildCount = await appChain.query.runtime.Guild.guildCount.get().value;
        // Expect block to be true
        expect(block1?.txs[0].status).toBe(true);
        // Expect guild count to be 1
        expect(guildCount?.toBigInt()).toBe(1n);
    });
});