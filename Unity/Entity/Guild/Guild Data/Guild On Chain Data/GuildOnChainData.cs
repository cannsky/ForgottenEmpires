namespace ForgottenEmpires.Entities.Guilds.Data
{
    public class GuildOnChainData
    {
        public GuildData guildData;

        public uint playerCount;

        public GuildOnChainData(GuildData guildData) => this.guildData = guildData;
    }
}