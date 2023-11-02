using ForgottenEmpires.BehaviourTrees;
using ForgottenEmpires.Checkers;
using ForgottenEmpires.Managers.Server;

namespace ForgottenEmpires.Entity.Elements.Enemies.Worker
{
    public class EnemyAttackStanceBehaviour : RunBehaviour
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
    }
}