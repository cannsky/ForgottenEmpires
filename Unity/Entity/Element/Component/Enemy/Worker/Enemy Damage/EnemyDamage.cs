using System.Collections;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.Enemies.Workers
{
    public class EnemyDamage
    {
        private EnemyWorker enemyWorker;

        private float damageCounter, damageLimit;

        public EnemyDamage(EnemyWorker enemyWorker) => this.enemyWorker = enemyWorker;

        // Method called when the player is damaged.
        public void OnEnemyDamage()
        {
            // If the damage counter is below the damage limit, return.
            if (damageCounter++ < damageLimit) return;

            // Play the hit animation and disable the player temporarily.
            enemyWorker.enemyAnimation.SetAnimation(Types.AnimationType.Hit, true);
            enemyWorker.enemy.isEnabled = false;

            // Start a coroutine to reset the player state after a delay.
            enemyWorker.enemy.StartCoroutine(ResetState());
        }

        // Coroutine to reset the player state after a delay.
        public IEnumerator ResetState()
        {
            yield return new WaitForSeconds(1f);

            // Enable the player and turn off the hit animation.
            enemyWorker.enemy.isEnabled = true;
            enemyWorker.enemyAnimation.SetAnimation(Types.AnimationType.Hit, false);
        }
    }
}