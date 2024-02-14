namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class GuildMasterUpdate
    {
        private GuildMasterWorker guildMasterWorker;

        public MerchantUpdate(GuildMasterWorker guildMasterWorker) => this.guildMasterWorker = guildMasterWorker;

        public void OnUpdate()
        {
            if (guildMasterWorker.guildMaster.isClient) OnClientUpdate();
            if (guildMasterWorker.guildMaster.isServer) OnServerUpdate();
        }

        public void OnClientUpdate()
        {

        }

        public void OnServerUpdate()
        {
            
        }
    }
}