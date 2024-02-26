using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerUI
    {
        private PlayerWorker playerWorker;

        public GameObject playerUIGameObject;
        public GameObject playerDeathUIGameObject;

        public PlayerUI(PlayerWorker playerWorker)
        {
            this.playerWorker = playerWorker;
            playerUIGameObject = GameObject.Find("Player Canvas");
            playerDeathUIGameObject = GameObject.Find("Player Death Canvas");
        }

        public void ToggleUI() => playerUIGameObject.SetActive(!playerUIGameObject.activeSelf);

        public void TogglePlayerDeathUI() => playerDeathUIGameObject.SetActive(!playerDeathUIGameObject.activeSelf);
    }
}