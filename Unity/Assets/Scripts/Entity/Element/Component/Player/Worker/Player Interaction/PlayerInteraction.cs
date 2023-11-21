using System.Collections.Generic;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerInteraction
    {
        private PlayerWorker playerWorker;

        public Element interactable;

        public PlayerInteraction(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        //TODO: THIS CODE IS NOT IMPLEMENTED, IMPLEMENT HERE
        public void OnUpdate()
        {
            if (!playerWorker.playerInput.interact) return;
            interactable.Interact(playerWorker.player);
        }
    }
}