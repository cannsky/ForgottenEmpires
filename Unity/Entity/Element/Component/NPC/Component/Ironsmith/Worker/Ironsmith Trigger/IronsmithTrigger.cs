using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class IronsmithTrigger
    {
        private IronsmithWorker ironsmithWorker;

        public IronsmithTrigger(IronsmithWorker ironsmithWorker) => this.ironsmithWorker = ironsmithWorker;

        public void OnTriggerEnter(Collider other)
        {
            if (other.tag != "Player") return;
            other.GetComponent<Player>().playerWorker.playerInteraction.interactable = ironsmithWorker.ironsmith;
        }

        public void OnTriggerExit(Collider other)
        {
            if (other.tag != "Player") return;
            other.GetComponent<Player>().playerWorker.playerInteraction.interactable = null;
        }
    }
}