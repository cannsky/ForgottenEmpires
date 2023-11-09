namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class MerchantInteraction
    {
        private MerchantWorker merchantWorker;

        public MerchantInteraction(MerchantWorker merchantWorker) => this.merchantWorker = merchantWorker;

        public void OnInteraction(Element element) => merchantWorker.merchantUI.ToggleUI();
    }
}