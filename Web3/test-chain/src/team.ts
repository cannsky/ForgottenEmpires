// This code is not completed.
// This code is not audited.

import {
    RuntimeModule,
    runtimeModule,
    state,
    runtimeMethod,
} from "@proto-kit/module";

import {
    StateMap,
    assert
} from "@proto-kit/protocol";

import {
    PublicKey,
    Struct,
    UInt64
} from "o1js";

export class TeamEntity extends Struct({
    leader: PublicKey,
    memberCount: UInt64,
}) {}

export class TeamInvitationKey extends Struct({
    teamid: UInt64,
    invitedplayer: PublicKey,
})

@runtimeModule()
export class Team extends RuntimeModule<{}> {

    @state() public teams = StateMap.from<UInt64, TeamEntity>(UInt64, TeamEntity);

    @state() public playerTeams = StateMap.from<PublicKey, UInt64>(PublicKey, UInt64);

    @state() public teamCount = State.from<UInt64>(UInt64);

    @state() public playerInvitations = StateMap.from<TeamInvitationKey, UInt64>(TeamInvitationKey, UInt64);

    @runtimeMethod()
    public newTeam() {
        // Ensure the caller is not already inside a team
        assert(this.playerTeams.get(this.transaction.sender.value).isSome.not(), "you cannot be in two teams at the same time")
        // Get team count
        const teamCount = this.teamCount.get().value;
        // Add 1 to team count
        const newTeamCount = UInt64.from(teamCount).add(UInt64.from(1));
        // Update team count
        this.teamCount.set(newTeamCount);
        // Create new team
        this.teams.set(
            newTeamCount,
            new TeamEntity({ 
                leader: this.transaction.sender.value,
                memberCount: UInt64.From(1)
            })
        );
        // Add the player who created the team to the team as member
        this.playerTeams.set(this.transaction.sender.value, newTeamCount);
    }

    @runtimeMethod()
    public invitePlayer(playerKey: PublicKey, teamId: UInt64) {
        // Ensure the team exists
        assert(this.teams.get(teamId).isSome, "Team does not exist");
        // Ensure the invitation is sent by the team leader
        assert(this.teams.get(teamId).value.leader.equals(this.transaction.sender), "You are not the leader of the team");
        // Get the team
        const team = this.teams.get(teamId).value;
        // Ensure the team is not full
        assert(team.memberCount.lessThanOrEqual(UInt64.from(4)), "Team is full");
        // Ensure the player is not already in a team
        assert(this.playerTeams.get(this.transaction.sender.value).isSome.not(), "The player is already in a team");
        // Invite the player
        this.playerInvitations.set(
            new TeamInvitationKey({
                teamid: teamId,
                invitedplayer: playerKey,
            }),
            UInt64.from(1)
        );
    }

    @runtimeMethod()
    public acceptInvitation(teamId: UInt64) {
        // Ensure the team exists
        assert(this.teams.get(teamId).isSome, "Team does not exist");
        // Get the team
        const team = this.teams.get(teamId).value;
        // Ensure the team is not full
        assert(team.memberCount.lessThanOrEqual(UInt64.from(4)), "Team is full");
        // Ensure the player is not already in a team
        assert(this.playerTeams.get(this.transaction.sender.value).isSome.not(), "You are already in a team");
        // Get team member count
        const teamMemberCount = team.memberCount;
        // Add 1 to team member count
        const newTeamMemberCount = UInt64.from(teamMemberCount).add(UInt64.from(1));
        // Update team member count
        this.teams.set(
            teamId,
            new TeamEntity({ 
                leader: team.leader,
                memberCount: newTeamMemberCount
            })
        );
        // Set players team as the joined team
        this.playerTeams.set(
            this.transaction.sender.value,
            teamId
        );
    }

    @runtimeMethod()
    public leaveTeam(teamId: UInt64) {
        // Ensure the team exists
        assert(this.teams.get(teamId).isSome, "Team does not exist");
        // Get the team
        const team = this.teams.get(teamId).value;
        // Ensure the team member count is more than 1
        assert(team.memberCount.greaterThanOrEqual(UInt64.from(2)), "You are the only player at the team, you cannot leave the team");
        // Ensure member leaving is not the leader of the team
        assert(this.transaction.sender.value.equal(team.leader).not(), "Leader cannot leave the guild");
        // Get team member count
        const teamMemberCount = team.memberCount;
        // Decrease team member count by 1
        const newTeamMemberCount = UInt64.from(teamMemberCount).sub(UInt64.from(1));
        // Update team member count
        this.teams.set(
            teamId,
            new TeamEntity({ 
                leader: team.leader,
                memberCount: newTeamMemberCount
            })
        );
        // Remove player from the team
        this.playerTeams.set(
            this.transaction.sender.value,
            UInt64.from(0)
        );
    }

    // methods will be added later...
}