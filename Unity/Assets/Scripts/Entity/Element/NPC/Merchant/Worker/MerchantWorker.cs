namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class MerchantWorker
    {
        public Merchant merchant;

        public MerchantUpdate merchantUpdate;

        public MerchantInteraction merchantInteraction;
        public MerchantTrade merchantTrade;
        public MerchantTrigger merchantTrigger;
        public MerchantUI merchantUI;

        public MerchantWorker(Merchant merchant)
        {
            this.merchant = merchant;

            merchantUpdate = new MerchantUpdate(this);

            merchantInteraction = new MerchantInteraction(this);
            merchantTrade = new MerchantTrade(this);
            merchantTrigger = new MerchantTrigger(this);
            merchantUI = new MerchantUI(this);
        }

        public void OnUpdate() => merchantUpdate.OnUpdate();
    }
}