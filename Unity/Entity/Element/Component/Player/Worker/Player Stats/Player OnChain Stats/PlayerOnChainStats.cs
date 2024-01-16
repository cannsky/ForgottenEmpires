using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerOnChainStats
    {
        private PlayerStats playerStats;

        public int potionCount, xp;

        public PlayerStats(PlayerStats playerStats) => this.playerStats = playerStats;

        // Update onchain data
        public void UpdateOnChainData(int potionCount)
        {
            this.potionCount = potionCount;
        }
    }
}