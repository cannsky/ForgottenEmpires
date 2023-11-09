namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class MerchantUpdate
    {
        private MerchantWorker merchantWorker;

        public MerchantUpdate(MerchantWorker merchantWorker) => this.merchantWorker = merchantWorker;

        public void OnUpdate()
        {
            if (merchantWorker.merchant.isClient) OnClientUpdate();
            if (merchantWorker.merchant.isServer) OnServerUpdate();
        }

        public void OnClientUpdate()
        {

        }

        public void OnServerUpdate()
        {
            
        }
    }
}