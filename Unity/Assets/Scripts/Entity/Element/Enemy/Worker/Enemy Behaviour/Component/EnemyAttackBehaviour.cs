using ForgottenEmpires.BehaviourTrees;
using UnityEngine;
using System.Collections;
using ForgottenEmpires.Checkers;
using ForgottenEmpires.Managers.Server;
using ForgottenEmpires.Types;

namespace ForgottenEmpires.Entities.Elements.Enemies.Workers
{
    public class EnemyAttackBehaviour : AttackBehaviour
    {
        private EnemyBehaviour enemyBehaviour;

        private bool isAttacked;

        private SingleRangeChecker singleRangeChecker;

        public EnemyAttackBehaviour(EnemyBehaviour enemyBehaviour)
        {
            this.enemyBehaviour = enemyBehaviour;
            singleRangeChecker = new SingleRangeChecker(enemyBehaviour.enemyWorker.enemy, 2f,
                ServerManager.Instance.serverManagerWorker.serverPlayerWorker.players);
        }

        public override bool GetPredicate() => !isAttacked;

        public override void HandleBehaviour()
        {
            if (!singleRangeChecker.Check()) return;
            singleRangeChecker.targets[0].TakeDamage(10f);
            isAttacked = true;
            enemyBehaviour.enemyWorker.enemy.StartCoroutine(ResetState());
            enemyBehaviour.enemyWorker.enemy.SetAnimation(AnimationType.Attack, true);
        }

        public override IEnumerator ResetState()
        {
            yield return new WaitForSeconds(5f);
            isAttacked = false;
        }
    }
}