namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerFixedUpdate
    {
        private PlayerWorker playerWorker;

        public PlayerFixedUpdate(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        // General Fixed Update
        public void OnFixedUpdate()
        {
            if (playerWorker.player.isClient) ClientOnFixedUpdate();
            if (playerWorker.player.isServer) ServerOnFixedUpdate();
        }

        // Client Fixed Update
        public void ClientOnFixedUpdate()
        {
            if (playerWorker.player.isLocalPlayer) OwnerClientOnFixedUpdate();
        }

        // Client Owner Fixed Update
        public void OwnerClientOnFixedUpdate()
        {

        }

        // Server Fixed Update
        public void ServerOnFixedUpdate()
        {
            
        }
    }
}