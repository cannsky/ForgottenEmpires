namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerLateUpdate
    {
        private PlayerWorker playerWorker;

        public PlayerLateUpdate(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        public void OnLateUpdate()
        {
            if (playerWorker.player.isClient) OnClientLateUpdate();
            if (playerWorker.player.isServer) OnServerLateUpdate();
        }

        public void OnClientLateUpdate()
        {
            playerWorker.playerInput.OnLateUpdate();
        }

        public void OnServerLateUpdate()
        {

        }
    }
}