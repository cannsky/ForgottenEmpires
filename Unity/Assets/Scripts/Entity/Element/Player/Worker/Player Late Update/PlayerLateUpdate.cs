namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerLateUpdate
    {
        private PlayerWorker playerWorker;

        public PlayerLateUpdate(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        // General Late Update
        public void OnLateUpdate()
        {
            if (playerWorker.player.isClient) OnClientLateUpdate();
            if (playerWorker.player.isServer) OnServerLateUpdate();
        }

        // Client Late Update
        public void OnClientLateUpdate()
        {
            OwnerClientOnLateUpdate();
        }

        // Client Owner Late Update
        public void OwnerClientOnLateUpdate()
        {
            if (!playerWorker.player.isLocalPlayer) return;
            playerWorker.playerCamera.OnLateUpdate();
            playerWorker.playerInput.OnLateUpdate();
        }

        // Server Late Update
        public void OnServerLateUpdate()
        {
            
        }
    }
}