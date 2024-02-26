import { TestingAppChain } from "@proto-kit/sdk";

import { PrivateKey, UInt64 } from "o1js";

import { Player } from "../../player";

import { Team, TeamInvitationKey } from "../../team";

import { log } from "@proto-kit/common";

log.setLevel("error");

describe("Team Leave Team Test", () => {
    it("Tests team leave team functionality", async () => {
        // Define appchain
        const appChain = TestingAppChain.fromRuntime({
            modules: {
                Player,
                Team,
            },
            config: {
                Player: {},
                Team: {}
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
        // Get the level of the new character
        let startLevel = await appChain.query.runtime.Player.players.get(alice).value.level;
        // Expect block to be true
        expect(blockStart?.txs[0].status).toBe(true);
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
        // Get total team count
        let teamCount = await appChain.query.runtime.Team.teamCount.get().value;
        // Expect block to be true
        expect(block1?.txs[0].status).toBe(true);
        // Expect team count to be 1
        expect(teamCount?.toBigInt()).toBe(1n);

        // CREATE A NEW OTHER PLAYER

        // Create a random private key
        const bobPrivateKey = PrivateKey.random();
        // Get public key of the private key
        const bob = bobPrivateKey.toPublicKey();

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
        // Get the level of the new character
        let otherPlayerStartLevel = await appChain.query.runtime.Player.players.get(bob).value.level;
        // Expect block to be true
        expect(blockOtherPlayer?.txs[0].status).toBe(true);
        // Expect start level to be 1
        expect(otherPlayerStartLevel?.toBigInt()).toBe(1n);

        // INVITE NEW PLAYER TO THE TEAM

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
        // Get invited players invitation
        let playerInvitation = await appChain.query.runtime.Team.playerInvitations.get(
            new TeamInvitationKey({
                teamid: UInt64.from(0),
                invitedplayer: bob
        })).value;
        // Expect block to be true
        expect(block2?.txs[0].status).toBe(true);
        // Expect invitation value to be 1
        expect(playerInvitation?.toBigInt()).toBe(1n);

        // Set signer for the new player
        appChain.setSigner(bobPrivateKey);

        // ACCEPT INVITATION

        // Accept invitation
        const tx3 = await appChain.transaction(bob, () => {
            team.acceptInvitation(UInt64.from(1));
        });
        // Sign the tx
        await tx3.sign();
        // Send the tx
        await tx3.send();
        // Produce block
        const block3 = await appChain.produceBlock();
        // Get player team
        let playerTeam = await appChain.query.runtime.Team.playerTeams.get(bob).value;
        // Expect block to be true
        expect(block3?.txs[0].status).toBe(true);
        // Expect player team value to be 1
        expect(playerTeam?.toBigInt()).toBe(1n);

        // LEAVE TEAM

        // Leave Team
        const tx4 = await appChain.transaction(bob, () => {
            team.leaveTeam(UInt64.from(1));
        });
        // Sign the tx
        await tx4.sign();
        // Send the tx
        await tx4.send();
        // Produce block
        const block4 = await appChain.produceBlock();
        // Get player team
        let playerTeam = await appChain.query.runtime.Team.playerTeams.get(bob).value;
        // Expect block to be true
        expect(block4?.txs[0].status).toBe(true);
        // Expect player team value to be 0
        expect(playerTeam?.toBigInt()).toBe(0n);
    });
});