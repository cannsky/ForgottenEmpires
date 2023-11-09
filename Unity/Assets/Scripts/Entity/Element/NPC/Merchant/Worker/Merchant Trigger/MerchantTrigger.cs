using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class MerchantTrigger
    {
        private MerchantWorker merchantWorker;

        public MerchantTrigger(MerchantWorker merchantWorker) => this.merchantWorker = merchantWorker;

        public void OnTriggerEnter(Collider other)
        {
            if (other.tag != "Player") return;
            other.GetComponent<Player>().playerWorker.playerInteraction.interactable = merchantWorker.merchant;
        }

        public void OnTriggerExit(Collider other)
        {
            if (other.tag != "Player") return;
            other.GetComponent<Player>().playerWorker.playerInteraction.interactable = null;
        }
    }
}