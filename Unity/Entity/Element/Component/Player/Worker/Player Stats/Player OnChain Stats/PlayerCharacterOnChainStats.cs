using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerCharacterOnChainStats
    {
        private PlayerStats playerStats;

        public int xp, level, statXp, damage, defense, maxUpgrade, maxLevel;

        public PlayerCharacterOnChainStats(PlayerStats playerStats) => this.playerStats = playerStats;

        // Update onchain data
        public void UpdateOnChainData(int xp, int level, int statXp, int damage, int defense, int maxUpgrade, int maxLevel)
        {
            this.xp = xp;
            this.level = level;
            this.statXp = statXp;
            this.damage = damage;
            this.defense = defense;
            this.maxUpgrade = maxUpgrade;
            this.maxLevel = maxLevel;
        }
    }
}