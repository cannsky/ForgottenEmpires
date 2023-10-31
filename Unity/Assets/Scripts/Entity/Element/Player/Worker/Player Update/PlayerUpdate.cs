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
            playerWorker.playerInput.OnUpdate();
        }

        public void ServerOnUpdate()
        {

        }
    }
}