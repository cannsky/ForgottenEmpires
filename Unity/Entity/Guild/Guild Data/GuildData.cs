namespace ForgottenEmpires.Entities.Guilds.Data
{
    public class GuildData
    {
        public Guild guild;

        public GuildOnChainData guildOnChainData;

        public GuildData(Guild guild){
            this.guild = guild;
            guildOnChainData = new GuildOnChainData(this);
        }
    }
}