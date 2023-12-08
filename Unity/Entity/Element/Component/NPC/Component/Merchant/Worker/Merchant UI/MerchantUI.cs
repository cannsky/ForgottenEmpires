using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class MerchantUI
    {
        private MerchantWorker merchantWorker;

        public GameObject merchantUIGameObject;

        public MerchantUI(MerchantWorker merchantWorker)
        {
            this.merchantWorker = merchantWorker;
            merchantUIGameObject = GameObject.Find("Merchant Canvas");
        }

        public void ToggleUI() => merchantUIGameObject.SetActive(!merchantUIGameObject.activeSelf);
    }
}