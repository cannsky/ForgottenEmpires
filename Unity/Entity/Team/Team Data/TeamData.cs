namespace ForgottenEmpires.Entities.Teams.Data
{
    public class TeamData
    {
        public Team team;

        public TeamOnChainData teamOnChainData;

        public TeamData(Team team){
            this.team = team;
            teamOnChainData = new TeamOnChainData(this);
        }
    }
}