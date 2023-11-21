using System.Collections.Generic;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerInventory
    {
        private PlayerWorker playerWorker;

        // Dictionary to store player inventory slots.
        public Dictionary<uint, PlayerInventorySlot> playerInventorySlots;

        public PlayerInventory(PlayerWorker playerWorker)
        {
            this.playerWorker = playerWorker;

            // Initialize the dictionary to store player inventory slots.
            playerInventorySlots = new Dictionary<uint, PlayerInventorySlot>();
        }
    }
}