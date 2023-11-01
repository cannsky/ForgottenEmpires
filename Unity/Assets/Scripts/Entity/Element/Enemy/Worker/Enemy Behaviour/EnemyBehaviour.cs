using ForgottenEmpires.BehaviourTrees;
using ForgottenEmpires.Checkers;

namespace ForgottenEmpires.Entity.Elements.Enemies.Worker
{
    public class EnemyBehaviour
    {
        public EnemyWorker enemyWorker;

        public BehaviourTree behaviourTree;

        public SingleRangeChecker singleRangeChecker;

        public EnemyBehaviour(EnemyWorker enemyWorker) => this.enemyWorker = enemyWorker;

        //TODO: FIX NULL IN HERE!
        public void OnStart() => behaviourTree = new BehaviourTree(null);

        public void OnUpdate() => behaviourTree.Iterate();
    }
}
