using System.Collections;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerDamage
    {
        private PlayerWorker playerWorker;

        private float damageCounter, damageLimit;

        public PlayerDamage(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        // Method called when the player is damaged.
        public void OnPlayerDamage()
        {
            // If the damage counter is below the damage limit, return.
            if (damageCounter++ < damageLimit) return;

            // Play the hit animation and disable the player temporarily.
            playerWorker.playerAnimation.SetAnimation(Types.AnimationType.Hit, true);
            playerWorker.player.isEnabled = false;

            // Start a coroutine to reset the player state after a delay.
            playerWorker.player.StartCoroutine(ResetState());
        }

        // Coroutine to reset the player state after a delay.
        public IEnumerator ResetState()
        {
            yield return new WaitForSeconds(1f);

            // Enable the player and turn off the hit animation.
            playerWorker.player.isEnabled = true;
            playerWorker.playerAnimation.SetAnimation(Types.AnimationType.Hit, false);
        }
    }
}