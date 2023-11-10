namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerStart
    {
        private PlayerWorker playerWorker;

        public PlayerStart(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        public void OnStart()
        {
            if (playerWorker.player.isClient) ClientOnStart();
            if (playerWorker.player.isServer) ServerOnStart();
        }

        public void ClientOnStart()
        {
            if (playerWorker.player.isLocalPlayer) OwnerClientOnStart();
        }

        public void OwnerClientOnStart()
        {
            playerWorker.playerCamera.OnStart();
        }

        public void ServerOnStart()
        {
            playerWorker.player.playerData.OnStart();
        }
    }
}