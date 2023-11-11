namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerStart
    {
        private PlayerWorker playerWorker;

        public PlayerStart(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        // General Start
        public void OnStart()
        {
            if (playerWorker.player.isClient) ClientOnStart();
            if (playerWorker.player.isServer) ServerOnStart();
        }

        // Client Start
        public void ClientOnStart()
        {
            if (playerWorker.player.isLocalPlayer) OwnerClientOnStart();
        }

        // Client Owner Start
        public void OwnerClientOnStart()
        {
            playerWorker.playerCamera.OnStart();
        }

        // Server Start
        public void ServerOnStart()
        {
            playerWorker.player.playerData.OnStart();
        }
    }
}