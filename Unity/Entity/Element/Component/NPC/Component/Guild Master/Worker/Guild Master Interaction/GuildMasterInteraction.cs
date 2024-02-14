namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class GuildMasterInteraction
    {
        private GuildMasterWorker guildMasterWorker;

        public GuildMasterInteraction(GuildMasterWorker guildMasterWorker) => this.guildMasterWorker = guildMasterWorker;

        public void OnInteraction(Element element) => guildMasterWorker.guildMasterUI.ToggleUI();
    }
}