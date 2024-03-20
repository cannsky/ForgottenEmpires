namespace ForgottenEmpires.Entities.Guilds
{
    public class Guild
    {
        // Guild data
        public GuildData guildData;

        // Guild id
        public uint id;

        // Guild name
        public string name;

        // Create new guild data on guild
        public Guild() => guildData = new GuildData();
    }
}