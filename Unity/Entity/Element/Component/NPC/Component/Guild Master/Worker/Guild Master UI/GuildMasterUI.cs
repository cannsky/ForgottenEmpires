using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class GuildMasterUI
    {
        private GuildMasterWorker guildMasterWorker;

        public GameObject guildMasterUIGameObject;

        public GuildMasterUI(GuildMasterWorker guildMasterWorker)
        {
            this.guildMasterWorker = guildMasterWorker;
            guildMasterUIGameObject = GameObject.Find("Guild Master Canvas");
        }

        public void ToggleUI() => guildMasterUIGameObject.SetActive(!guildMasterUIGameObject.activeSelf);
    }
}