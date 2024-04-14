import { TestingAppChain } from "@proto-kit/sdk";

import { PrivateKey } from "o1js";

import { UInt64 } from "@proto-kit/library";

import { Player } from "../../src/player";

import { Guild } from "../../src/guild";

import { log } from "@proto-kit/common";

log.setLevel("error");

describe("Guild New Guild Test", () => {
    it("Tests guild new guild functionality", async () => {
        // Define appchain
        const appChain = TestingAppChain.fromRuntime({
            Guild,
            Player,
        });
        // Configure
        appChain.configurePartial({
            Runtime: {
                Guild: {},
                Player: {},
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
        // Get guild creation
        const guild = appChain.runtime.resolve("Guild");

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
        // Get promise
        let guildMemberCountPromise = await appChain.query.runtime.Guild.guilds.get(UInt64.from(1));
        // Get guild member count
        let guildMemberCount = await guildMemberCountPromise?.memberCount;
        // Expect block to be true
        expect(block1?.transactions[0].status.toBoolean()).toBe(true);
        // Expect guild member count to be 1
        expect(guildMemberCount?.toBigInt()).toBe(1n);
    });
});