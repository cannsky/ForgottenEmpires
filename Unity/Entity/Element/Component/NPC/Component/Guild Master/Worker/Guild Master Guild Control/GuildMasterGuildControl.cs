using ForgottenEmpires.Managers.JS;

namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class GuildMasterGuildControl
    {
        private GuildMasterWorker guildMasterWorker;

        public GuildMasterGuildControl(GuildMasterWorker guildMasterWorker) => this.guildMasterWorker = guildMasterWorker;

        public void CreateGuild() => JSConnector.Instance.CreateGuild();

        public void JoinGuild(uint guildID) => JSConnector.Instance.JoinGuild(guildID);

        public void LeaveGuild(uint guildID) => JSConnector.Instance.LeaveGuild(guildID);
    }
}