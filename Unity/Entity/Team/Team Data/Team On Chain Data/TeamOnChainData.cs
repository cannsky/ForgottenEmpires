namespace ForgottenEmpires.Entities.Kingdoms.Data
{
    public class TeamOnChainData
    {
        public TeamData teamData;

        public uint memberCount;

        public TeamOnChainData(TeamData teamData) => this.teamData = teamData;
    }
}