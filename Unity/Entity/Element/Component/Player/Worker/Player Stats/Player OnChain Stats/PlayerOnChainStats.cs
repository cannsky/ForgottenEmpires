using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerOnChainStats
    {
        private PlayerStats playerStats;

        public int xp, level, kingdom;

        public PlayerStats(PlayerStats playerStats) => this.playerStats = playerStats;

        // Update onchain data
        public void UpdateOnChainData(int xp, int level, int kingdom)
        {
            this.xp = xp;
            this.level = level;
            this.kingdom = kingdom;
        }
    }
}