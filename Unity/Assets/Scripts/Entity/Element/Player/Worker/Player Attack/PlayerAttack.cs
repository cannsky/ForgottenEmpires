using ForgottenEmpires.Checkers;
using ForgottenEmpires.Managers.Server;
using System.Collections;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerAttack
    {
        private PlayerWorker playerWorker;

        // Range checkers for detecting targets in player ranges.
        private SingleRangeChecker singlePlayerRangeChecker, singleEnemyRangeChecker;

        // Reference to the current attack target.
        private Element target;

        // Attack state
        private bool isAttacking;

        public PlayerAttack(PlayerWorker playerWorker)
        {
            this.playerWorker = playerWorker;

            // Initialize range checkers with player ranges and available targets.
            singlePlayerRangeChecker = new SingleRangeChecker(playerWorker.player, 1.7f, 
                ServerManager.Instance.serverManagerWorker.serverPlayerWorker.players);
            singleEnemyRangeChecker = new SingleRangeChecker(playerWorker.player, 1.7f,
                ServerManager.Instance.serverManagerWorker.serverEnemyWorker.enemies);
        }

        // Handle the attack action.
        public void Attack()
        {
            // Return if the player is already attacking.
            if (isAttacking) return;

            // Check if there are valid targets in both player and enemy ranges.
            if (!singlePlayerRangeChecker.Check() && !singleEnemyRangeChecker.Check()) return;

            // Update state that the player is currently attacking.
            isAttacking = true;

            // Play attack animation
            playerWorker.playerAnimation.SetAnimation(Types.AnimationType.Attack, true);

            // Determine the target
            target = singlePlayerRangeChecker.Check() ? singlePlayerRangeChecker.activeTargets[0] :
                singleEnemyRangeChecker.activeTargets[0];

            // Deal damage to the target.
            target.TakeDamage(10f);

            // Start a coroutine to reset the attack state.
            playerWorker.player.StartCoroutine(ResetState());
        }

        // Coroutine to reset the attack state after a delay.
        public IEnumerator ResetState()
        {
            yield return new WaitForSeconds(1f);

            // Reset the attack state and animation.
            isAttacking = false;
            playerWorker.playerAnimation.SetAnimation(Types.AnimationType.Attack, false);
        } 
    }
}