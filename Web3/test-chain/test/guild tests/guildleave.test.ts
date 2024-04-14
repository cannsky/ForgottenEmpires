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

        // CREATE A NEW PLAYER FOR TESTING JOINIG TO THE GUILD

        // Create a random private key
        const bobPrivateKey = PrivateKey.random();
        // Get public key of the private key
        const bob = bobPrivateKey.toPublicKey();
        // Set private key
        appChain.setSigner(bobPrivateKey);

        // Create a new player for the key
        const startJoinTX = await appChain.transaction(bob, () => {
            player.newPlayer();
        });
        // Sign the tx
        await startJoinTX.sign();
        // Send the tx
        await startJoinTX.send();
        // Produce block
        const blockjoinStart = await appChain.produceBlock();
        // Get promise
        let startJoinLevelPromise = await appChain.query.runtime.Player.players.get(bob);
        // Get level of the new player
        let startJoinLevel = await startJoinLevelPromise?.level;
        // Expect block to be true
        expect(blockjoinStart?.transactions[0].status.toBoolean()).toBe(true);
        // Expect start level to be 1
        expect(startJoinLevel?.toBigInt()).toBe(1n);

        // TEST JOINING TO THE GUILD

        // Join to the guild with player
        const guildJoinTX = await appChain.transaction(bob, () => {
            guild.joinGuild(UInt64.from(1));
        });
        // Sign the tx
        await guildJoinTX.sign();
        // Send the tx
        await guildJoinTX.send();
        // Produce block 
        const blockGuildJoin = await appChain.produceBlock();
        // Get promise
        let newGuildMemberCountPromise = await appChain.query.runtime.Guild.guilds.get(UInt64.from(1));
        // Get new guild member count
        let newGuildMemberCount = await newGuildMemberCountPromise?.memberCount;
        // Expect block to be true
        expect(blockGuildJoin?.transactions[0].status.toBoolean()).toBe(true);
        // Expect guild member count to be 2
        expect(newGuildMemberCount?.toBigInt()).toBe(2n);

        // TEST LEAVING THE GUILD

        // Leave the guild 
        const guildLeaveTx = await appChain.transaction(bob, () => {
            guild.leaveGuild(UInt64.from(1));
        });
        // Sign the tx
        await guildLeaveTx.sign();
        // Send the tx
        await guildLeaveTx.send();
        // Produce block
        const blockGuildLeave = await appChain.produceBlock();
        // Get promise
        let newGuildMemberCountAfterPlayerLeftPromise = await appChain.query.runtime.Guild.guilds.get(UInt64.from(1));
        // Get new guild member count after member left
        let newGuildMemberCountAfterPlayerLeft = await newGuildMemberCountAfterPlayerLeftPromise?.memberCount;
        // Expect block to be true
        expect(blockGuildLeave?.transactions[0].status.toBoolean()).toBe(true);
        // Expect guild count to be 1
        expect(newGuildMemberCountAfterPlayerLeft?.toBigInt()).toBe(1n);
    });
});