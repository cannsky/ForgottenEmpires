using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerUpdate
    {
        private PlayerWorker playerWorker;

        public PlayerUpdate(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        public bool someBool;

        // General Update
        public void OnUpdate()
        {
            if (playerWorker.player.isClient) ClientOnUpdate();
            if (playerWorker.player.isServer) ServerOnUpdate();
        }

        // Client Update
        public void ClientOnUpdate()
        {
            if (playerWorker.player.isLocalPlayer) OwnerClientOnUpdate();
        }

        // Client Owner Update
        public void OwnerClientOnUpdate()
        {
            playerWorker.playerInput.OnUpdate();
            playerWorker.player.healthText.text = playerWorker.player.potionCount.ToString();
            if (!someBool && Input.GetKeyDown(KeyCode.R))
            {
                someBool = true;
                playerWorker.player.CmdPlayerHealthRequest();
            }
        }

        // Server Update
        public void ServerOnUpdate()
        {
            playerWorker.playerRotation.OnUpdate();
            playerWorker.playerMovement.OnUpdate();
        }
    }
}