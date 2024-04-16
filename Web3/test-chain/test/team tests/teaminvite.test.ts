import { TestingAppChain } from "@proto-kit/sdk";

import { PrivateKey } from "o1js";

import { UInt64 } from "@proto-kit/library";

import { Player } from "../../src/player";

import { Team, TeamInvitationKey } from "../../src/team";

import { log } from "@proto-kit/common";

log.setLevel("error");

describe("Team Invite Player Test", () => {
    it("Tests team invite player functionality", async () => {
        // Define appchain
        const appChain = TestingAppChain.fromRuntime({
            Player,
            Team,
        });
        // Configure
        appChain.configurePartial({
            Runtime: {
                Player: {},
                Team: {},
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
        const team = appChain.runtime.resolve("Team");

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

        // CREATE A NEW TEAM

        // Create a new team for the player
        const tx1 = await appChain.transaction(alice, () => {
            team.newTeam();
        });
        // Sign the tx
        await tx1.sign();
        // Send the tx
        await tx1.send();
        // Produce block
        const block1 = await appChain.produceBlock();
        // Get promise
        let teamMemberCountPromise = await appChain.query.runtime.Team.teams.get();
        // Get team member count
        let teamMemberCount = await teamMemberCountPromise?.memberCount;
        // Expect block to be true
        expect(block1?.transactions[0].status.toBoolean()).toBe(true);
        // Expect team member count to be 1
        expect(teamMemberCount?.toBigInt()).toBe(1n);

        // CREATE A NEW OTHER PLAYER

        // Create a random private key
        const bobPrivateKey = PrivateKey.random();
        // Get public key of the private key
        const bob = bobPrivateKey.toPublicKey();
        // Set private key
        appChain.setSigner(bobPrivateKey);

        // Create a new player for the key
        const otherPlayerTX = await appChain.transaction(bob, () => {
            player.newPlayer();
        });
        // Sign the tx
        await otherPlayerTX.sign();
        // Send the tx
        await otherPlayerTX.send();
        // Produce block
        const blockOtherPlayer = await appChain.produceBlock();
        // Get promise
        let otherPlayerStartLevelPromise = await appChain.query.runtime.Player.players.get(bob);
        // Get player start level
        let otherPlayerStartLevel = otherPlayerStartLevelPromise?.level;
        // Expect block to be true
        expect(blockOtherPlayer?.transactions[0].status.toBoolean()).toBe(true);
        // Expect start level to be 1
        expect(otherPlayerStartLevel?.toBigInt()).toBe(1n);

        // INVITE NEW PLAYER TO THE TEAM

        // Set private key
        appChain.setSigner(alicePrivateKey);

        // Invite player to the team
        const tx2 = await appChain.transaction(alice, () => {
            team.invitePlayer(bob, UInt64.from(1));
        });
        // Sign the tx
        await tx2.sign();
        // Send the tx
        await tx2.send();
        // Produce block
        const block2 = await appChain.produceBlock();
        // Generate team invitation key
        let teamInvitation = new TeamInvitationKey({
            teamid: UInt64.from(1),
            invitedplayer: bob
        });
        // Get promise
        let playerInvitationActivePromise = await appChain.query.runtime.Team.playerInvitations.get(teamInvitation);
        // Get invited player's invitation
        let playerInvitationActive = await playerInvitationActivePromise?.active;
        // Expect block to be true
        expect(block2?.transactions[0].status.toBoolean()).toBe(true);
        // Expect invitation value to be 1
        expect(playerInvitationActive?.toBigInt()).toBe(1n);
    });
});