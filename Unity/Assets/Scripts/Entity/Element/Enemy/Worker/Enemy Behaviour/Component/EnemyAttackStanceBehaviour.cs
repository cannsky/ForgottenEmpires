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
            firstSingleRangeChecker = new SingleRangeChecker(enemyBehaviour.enemyWorker.enemy, 1f,
                ServerManager.Instance.serverManagerWorker.serverPlayerWorker.players);
            secondSingleRangeChecker = new SingleRangeChecker(enemyBehaviour.enemyWorker.enemy, 1.2f,
                ServerManager.Instance.serverManagerWorker.serverPlayerWorker.players);
        }

        public override bool GetPredicate() 
        {
            value = isWaitingForAttack ? secondSingleRangeChecker.Check() : firstSingleRangeChecker.Check();
            isWaitingForAttack = value;
            return value;
        }

        public override void HandleBehaviour()
        {
            isWaitingForAttack = true;
            enemyBehaviour.enemyWorker.enemyMovement.StopMovement();
            enemyBehaviour.enemyWorker.enemy.SetAnimation(AnimationType.AttackStance, true);
        }
    }
}