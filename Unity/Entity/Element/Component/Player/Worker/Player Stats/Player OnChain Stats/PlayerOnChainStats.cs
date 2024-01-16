using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerOnChainStats
    {
        private PlayerStats playerStats;

        public int potionCount;

        public PlayerStats(PlayerStats playerStats) => this.playerStats = playerStats;

        // Update onchain data
        public void UpdateOnChainData(float potionCount)
        {
            this.potionCount = potionCount;
        }
    }
}