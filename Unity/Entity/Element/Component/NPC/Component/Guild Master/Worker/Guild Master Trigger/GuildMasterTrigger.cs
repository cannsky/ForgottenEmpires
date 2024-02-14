using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class GuildMasterTrigger
    {
        private GuildMasterWorker guildMasterWorker;

        public GuildMasterTrigger(GuildMasterWorker guildMasterWorker) => this.guildMasterWorker = guildMasterWorker;

        public void OnTriggerEnter(Collider other)
        {
            if (other.tag != "Player") return;
            other.GetComponent<Player>().playerWorker.playerInteraction.interactable = guildMasterWorker.guildMaster;
        }

        public void OnTriggerExit(Collider other)
        {
            if (other.tag != "Player") return;
            other.GetComponent<Player>().playerWorker.playerInteraction.interactable = null;
        }
    }
}