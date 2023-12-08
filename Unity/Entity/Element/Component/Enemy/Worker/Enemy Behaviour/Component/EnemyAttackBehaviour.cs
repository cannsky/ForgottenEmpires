using ForgottenEmpires.BehaviourTrees;
using UnityEngine;
using System.Collections;
using ForgottenEmpires.Checkers;
using ForgottenEmpires.Types;
using ForgottenEmpires.Managers.Server.Workers;

namespace ForgottenEmpires.Entities.Elements.Enemies.Workers
{
    public class EnemyAttackBehaviour : AttackBehaviour
    {
        private EnemyBehaviour enemyBehaviour;

        // Bools for attack state.
        private bool isAttacked, isAttacking;

        // Checker for detecting targets.
        private SingleRangeChecker singleRangeChecker;

        public EnemyAttackBehaviour(EnemyBehaviour enemyBehaviour)
        {
            this.enemyBehaviour = enemyBehaviour;

            // Initialize the single range checker with enemy's attack range and available targets.
            singleRangeChecker = new SingleRangeChecker(enemyBehaviour.enemyWorker.enemy, 1f,
                ServerPlayerWorker.players);
        }

        public override bool GetPredicate() => !isAttacked;

        public override void HandleBehaviour()
        {
            // Check if there are valid targets in range or if the enemy is already attacking.
            if (!singleRangeChecker.Check() || isAttacking) return;

            // Deal damage to the first target in range.
            (target = singleRangeChecker.targets[0]).TakeDamage(10f);

            // Set attack state and set animation.
            isAttacking = true;
            enemyBehaviour.enemyWorker.enemy.StartCoroutine(ResetState());
            enemyBehaviour.enemyWorker.enemy.SetAnimation(AnimationType.Attack, true);
        }

        // Coroutine to reset attack state after a delay.
        public override IEnumerator ResetState()
        {
            // Start enemy rotation towards player
            enemyBehaviour.enemyWorker.enemyRotation.StartRotation();

            yield return new WaitForSeconds(2f);

            // Set isAttacked to true and wait for an additional delay.
            isAttacked = true;

            // Stop enemy rotation towards player
            enemyBehaviour.enemyWorker.enemyRotation.StopRotation();

            yield return new WaitForSeconds(3f);

            // Reset attack state.
            isAttacking = false;
            isAttacked = false;
        }
    }
}