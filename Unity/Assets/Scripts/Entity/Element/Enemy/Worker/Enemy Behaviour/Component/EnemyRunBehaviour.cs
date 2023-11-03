using ForgottenEmpires.BehaviourTrees;
using ForgottenEmpires.Checkers;
using ForgottenEmpires.Managers.Server;

namespace ForgottenEmpires.Entity.Elements.Enemies.Workers
{
    public class EnemyRunBehaviour : RunBehaviour
    {
        private EnemyBehaviour enemyBehaviour;

        public SingleRangeChecker singleRangeChecker;

        public EnemyRunBehaviour(EnemyBehaviour enemyBehaviour) 
        {
            this.enemyBehaviour = enemyBehaviour;
            singleRangeChecker = new SingleRangeChecker(enemyBehaviour.enemyWorker.enemy, 10f,
                ServerManager.Instance.serverManagerWorker.serverPlayerWorker.players);
        }

        public override bool GetPredicate() => singleRangeChecker.Check();
    }
}