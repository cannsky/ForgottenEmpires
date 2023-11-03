using ForgottenEmpires.BehaviourTrees;
using ForgottenEmpires.Checkers;

namespace ForgottenEmpires.Entity.Elements.Enemies.Workers
{
    public class EnemyBehaviour
    {
        public EnemyWorker enemyWorker;

        public BehaviourTree behaviourTree;

        public EnemyBehaviour(EnemyWorker enemyWorker) => this.enemyWorker = enemyWorker;

        //TODO: FIX NULL IN HERE!
        public void OnStart() => behaviourTree = new BehaviourTree(null);

        public void OnUpdate() => behaviourTree.Iterate();
    }
}
