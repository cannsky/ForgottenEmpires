using System.Collections;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerDamage
    {
        private PlayerWorker playerWorker;

        private float damageCounter, damageLimit;

        public PlayerDamage(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        public void OnPlayerDamage()
        {
            if (damageCounter++ < damageLimit) return;
            playerWorker.playerAnimation.SetAnimation(Types.AnimationType.Hit, true);
            playerWorker.player.isEnabled = false;
            playerWorker.player.StartCoroutine(ResetState());
        }

        public IEnumerator ResetState()
        {
            yield return new WaitForSeconds(1f);
            playerWorker.player.isEnabled = true;
            playerWorker.playerAnimation.SetAnimation(Types.AnimationType.Hit, false);
        }
    }
}