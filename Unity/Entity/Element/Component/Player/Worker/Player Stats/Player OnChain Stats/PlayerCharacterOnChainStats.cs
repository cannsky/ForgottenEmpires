using UnityEngine;

using ForgottenEmpires.Managers.JS;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerCharacterOnChainStats
    {
        private PlayerStats playerStats;

        public uint characterID, xp, level, statXp, damage, defense, maxUpgrade, maxLevel, world;

        public PlayerCharacterOnChainStats(PlayerStats playerStats) => this.playerStats = playerStats;

        // Update onchain data
        public void UpdateOnChainData(uint xp, uint level, uint statXp, uint damage, uint defense, uint maxUpgrade, uint maxLevel, uint world)
        {
            this.xp = xp;
            this.level = level;
            this.statXp = statXp;
            this.damage = damage;
            this.defense = defense;
            this.maxUpgrade = maxUpgrade;
            this.maxLevel = maxLevel;
            this.world = world;
        }

        public void ChangeWorld(uint newWorld) => JSConnector.Instance.ChangeWorld(newWorld);
    }
}