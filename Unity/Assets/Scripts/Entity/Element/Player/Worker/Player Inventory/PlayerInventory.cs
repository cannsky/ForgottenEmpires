using System.Collections.Generic;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerInventory
    {
        private PlayerWorker playerWorker;

        public Dictionary<uint, PlayerInventorySlot> playerInventorySlots;

        public PlayerInventory(PlayerWorker playerWorker)
        {
            this.playerWorker = playerWorker;
            playerInventorySlots = new Dictionary<uint, PlayerInventorySlot>();
        }
    }
}