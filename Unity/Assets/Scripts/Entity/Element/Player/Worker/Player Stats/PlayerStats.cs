using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerStats
    {
        private PlayerWorker playerWorker;

        public PlayerStats(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        public void OnUpdate()
        {

        }

        // Regenerate player health over time.
        public void Regenerate()
        {
            // Check if player health is below the maximum limit
            // Increment player health over time (with a rate of 1 unit per second)
            // Ensure that health does not exceed the maximum limit
            if (playerWorker.player.health <= playerWorker.player.totalHealth)
                if ((playerWorker.player.health += 1f * Time.deltaTime) > playerWorker.player.totalHealth) 
                    playerWorker.player.health = playerWorker.player.totalHealth;
        }

        // Apply damage to the player.
        public void TakeDamage(float damage)
        {
            // Ensure that applied damage is non-negative
            var appliedDamage = damage;
            if (appliedDamage <= 0) return;

            // Reduce player health by the applied damage
            // If player health reaches or falls below zero, trigger player death
            else if ((playerWorker.player.health -= appliedDamage) <= 0) Die();
            else playerWorker.playerDamage.OnPlayerDamage();
        }

        public void Die()
        {
            //TODO: Implement here
        }
    }
}