namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerUpdate
    {
        private PlayerWorker playerWorker;

        public PlayerUpdate(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        public void OnUpdate()
        {
            if (playerWorker.player.isClient) ClientOnUpdate();
            if (playerWorker.player.isServer) ServerOnUpdate();
        }

        public void ClientOnUpdate()
        {
            if (playerWorker.player.isLocalPlayer) OwnerClientOnUpdate();
        }

        public void OwnerClientOnUpdate()
        {
            playerWorker.playerInput.OnUpdate();
            playerWorker.playerCamera.OnUpdate();
        }

        public void ServerOnUpdate()
        {

        }
    }
}