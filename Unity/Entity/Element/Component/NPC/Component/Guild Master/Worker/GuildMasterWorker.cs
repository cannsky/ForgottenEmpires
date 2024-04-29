namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class GuildMasterWorker
    {
        public GuildMaster guildMaster;

        public GuildMasterUpdate guildMasterUpdate;

        public GuildMasterInteraction guildMasterInteraction;
        public GuildMasterTrigger guildMasterTrigger;
        public GuildMasterUI guildMasterUI;

        public GuildMasterWorker(GuildMaster guildMaster)
        {
            this.guildMaster = guildMaster;

            guildMasterUpdate = new GuildMasterUpdate(this);

            guildMasterInteraction = new GuildMasterInteraction(this);
            guildMasterTrigger = new GuildMasterTrigger(this);
            guildMasterUI = new GuildMasterUI(this);
        }

        public void OnUpdate() => guildMasterUpdate.OnUpdate();
    }
}