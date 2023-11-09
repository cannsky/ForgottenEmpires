namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
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
        }

        public void ServerOnUpdate()
        {
            playerWorker.playerRotation.OnUpdate();
            playerWorker.playerMovement.OnUpdate();
        }
    }
}