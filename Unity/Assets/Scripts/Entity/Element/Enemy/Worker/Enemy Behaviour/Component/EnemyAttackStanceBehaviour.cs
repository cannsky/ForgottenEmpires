using ForgottenEmpires.BehaviourTrees;
using ForgottenEmpires.Checkers;
using ForgottenEmpires.Managers.Server;
using ForgottenEmpires.Types;

namespace ForgottenEmpires.Entity.Elements.Enemies.Workers
{
    public class EnemyAttackStanceBehaviour : AttackStanceBehaviour
    {
        private EnemyBehaviour enemyBehaviour;

        public SingleRangeChecker singleRangeChecker;

        public EnemyAttackStanceBehaviour(EnemyBehaviour enemyBehaviour)
        {
            this.enemyBehaviour = enemyBehaviour;
            singleRangeChecker = new SingleRangeChecker(enemyBehaviour.enemyWorker.enemy, 2f,
                ServerManager.Instance.serverManagerWorker.serverPlayerWorker.players);
        }

        public override bool GetPredicate() => singleRangeChecker.Check();

        public override void HandleBehaviour() => enemyBehaviour.enemyWorker.enemy.SetAnimation(AnimationType.AttackStance, true);
    }
}