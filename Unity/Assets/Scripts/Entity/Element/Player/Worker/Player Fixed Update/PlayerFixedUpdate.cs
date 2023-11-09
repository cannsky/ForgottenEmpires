namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerFixedUpdate
    {
        private PlayerWorker playerWorker;

        public PlayerFixedUpdate(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        public void OnFixedUpdate()
        {
            if (playerWorker.player.isClient) ClientOnFixedUpdate();
            if (playerWorker.player.isServer) ServerOnFixedUpdate();
        }

        public void ClientOnFixedUpdate()
        {
            if (playerWorker.player.isLocalPlayer) OwnerClientOnFixedUpdate();
        }

        public void OwnerClientOnFixedUpdate()
        {

        }

        public void ServerOnFixedUpdate()
        {
            
        }
    }
}