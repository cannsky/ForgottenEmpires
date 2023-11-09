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

        public void Regenerate()
        {
            if (playerWorker.player.health <= playerWorker.player.totalHealth)
                if ((playerWorker.player.health += 1f * Time.deltaTime) > playerWorker.player.totalHealth) 
                    playerWorker.player.health = playerWorker.player.totalHealth;
        }

        public void TakeDamage(float damage)
        {
            var appliedDamage = damage - playerWorker.player.playerData.armor;
            if (appliedDamage <= 0) return;
            else if ((playerWorker.player.health -= appliedDamage) <= 0) Die();
            else playerWorker.playerDamage.OnPlayerDamage();
        }

        public void Die()
        {
            //TODO: Implement here.
        }
    }
}