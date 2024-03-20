namespace ForgottenEmpires.Entities.Teams
{
    public class Team
    {
        // Team data
        public TeamData teamData;

        // Kingdom id
        public uint id;

        // Kingdom name
        public string name;

        // Create team data on team
        public Team() => teamData = new TeamData();
    }
}