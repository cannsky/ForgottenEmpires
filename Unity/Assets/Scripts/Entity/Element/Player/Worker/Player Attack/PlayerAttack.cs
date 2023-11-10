using ForgottenEmpires.Checkers;
using ForgottenEmpires.Managers.Server;
using System.Collections;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerAttack
    {
        private PlayerWorker playerWorker;

        private SingleRangeChecker singlePlayerRangeChecker, singleEnemyRangeChecker;

        private Element target;

        private bool isAttacking;

        public PlayerAttack(PlayerWorker playerWorker)
        {
            this.playerWorker = playerWorker;
            singlePlayerRangeChecker = new SingleRangeChecker(playerWorker.player, 1.7f, 
                ServerManager.Instance.serverManagerWorker.serverPlayerWorker.players);
            singleEnemyRangeChecker = new SingleRangeChecker(playerWorker.player, 1.7f,
                ServerManager.Instance.serverManagerWorker.serverEnemyWorker.enemies);
        }

        public void Attack()
        {
            if (isAttacking) return;
            if (!singlePlayerRangeChecker.Check() && !singleEnemyRangeChecker.Check()) return;
            isAttacking = true;

            playerWorker.playerAnimation.SetAnimation(Types.AnimationType.Attack, true);

            target = singlePlayerRangeChecker.Check() ? singlePlayerRangeChecker.activeTargets[0] :
                singleEnemyRangeChecker.activeTargets[0];

            target.TakeDamage(10f);

            playerWorker.player.StartCoroutine(ResetState());
        }

        public IEnumerator ResetState()
        {
            yield return new WaitForSeconds(1f);
            isAttacking = false;
            playerWorker.playerAnimation.SetAnimation(Types.AnimationType.Attack, false);
        } 
    }
}