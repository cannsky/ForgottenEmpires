using ForgottenEmpires.BehaviourTrees;

namespace ForgottenEmpires.Entity.Elements.Enemies.Worker
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
