using ForgottenEmpires.BehaviourTrees;
using ForgottenEmpires.Checkers;
using ForgottenEmpires.Managers.Server;
using ForgottenEmpires.Types;

namespace ForgottenEmpires.Entities.Elements.Enemies.Workers
{
    public class EnemyAttackStanceBehaviour : AttackStanceBehaviour
    {
        private EnemyBehaviour enemyBehaviour;

        public SingleRangeChecker firstSingleRangeChecker, secondSingleRangeChecker;

        private bool isWaitingForAttack, value;

        public EnemyAttackStanceBehaviour(EnemyBehaviour enemyBehaviour)
        {
            this.enemyBehaviour = enemyBehaviour;

            // Initialize the single range checkers with enemy's attack stance ranges and available targets
            // Second ranger is for making enemy to wait if player is getting away from the enemy
            firstSingleRangeChecker = new SingleRangeChecker(enemyBehaviour.enemyWorker.enemy, 1f,
                ServerManager.Instance.serverManagerWorker.serverPlayerWorker.players);
            secondSingleRangeChecker = new SingleRangeChecker(enemyBehaviour.enemyWorker.enemy, 1.2f,
                ServerManager.Instance.serverManagerWorker.serverPlayerWorker.players);
        }

        public override bool GetPredicate() 
        {
            // Choose the appropriate range checker based on the current state, is player getting away?
            value = isWaitingForAttack ? secondSingleRangeChecker.Check() : firstSingleRangeChecker.Check();
            isWaitingForAttack = value;
            return value;
        }

        public override void HandleBehaviour()
        {
            if (!isWaitingForAttack) target = firstSingleRangeChecker.targets[0];

            // Set state for an attack opportunity.
            isWaitingForAttack = true;

            // Stop the enemy's movement and set attack stance animation.
            enemyBehaviour.enemyWorker.enemyMovement.StopMovement();
            enemyBehaviour.enemyWorker.enemy.SetAnimation(AnimationType.AttackStance, true);

            // Start rotation for the target
            enemyBehaviour.enemyWorker.enemyRotation.StartRotation();
        }
    }
}