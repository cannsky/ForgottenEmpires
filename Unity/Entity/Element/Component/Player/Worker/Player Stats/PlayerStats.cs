using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerStats
    {
        private PlayerWorker playerWorker;

        public PlayerOnChainStats playerOnChainStats;
        public PlayerCharacterOnChainStats playerCharacterOnChainStats;

        public PlayerStats(PlayerWorker playerWorker) 
        {
            this.playerWorker = playerWorker;

            playerOnChainStats = new PlayerOnChainStats(this);
            playerCharacterOnChainStats = new PlayerCharacterOnChainStats(this);
        }

        public void OnUpdate()
        {

        }

        // Regenerate player health over time.
        public void Regenerate()
        {
            if (ServerDayNightWorker.currentTimeOfDay < 0.25 || ServerDayNightWorker.currentTimeOfDay > 0.75) return;
            // Check if player health is below the maximum limit
            // Increment player health over time (with a rate of 1 unit per second)
            // Ensure that health does not exceed the maximum limit
            if (playerWorker.player.health <= playerWorker.player.totalHealth)
                if ((playerWorker.player.health += 1f * Time.deltaTime) > playerWorker.player.totalHealth) 
                    playerWorker.player.health = playerWorker.player.totalHealth;
        }

        public float CalculateNewHealth()
        {
            return playerWorker.player.health += 1f * Time.deltaTime;
        }

        // Apply damage to the player.
        public void TakeDamage(float damage)
        {
            // Ensure that applied damage is non-negative
            var appliedDamage = damage - playerWorker.player.elementWorker.elementStats.armor + playerWorker.player.elementWorker.elementStats.armorBonus;
            if (appliedDamage <= 0) return;

            // Reduce player health by the applied damage
            // If player health reaches or falls below zero, trigger player death
            else if ((playerWorker.player.health -= appliedDamage) <= 0) playerWorker.playerDeath.OnDeath();
            else playerWorker.playerDamage.OnPlayerDamage();
        }
    }
}