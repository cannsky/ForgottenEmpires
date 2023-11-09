using ForgottenEmpires.BehaviourTrees;
using ForgottenEmpires.Checkers;

namespace ForgottenEmpires.Entities.Elements.Enemies.Workers
{
    public class EnemyBehaviour
    {
        public EnemyWorker enemyWorker;

        public BehaviourTree behaviourTree;

        public EnemyIdleBehaviour enemyIdleBehaviour;
        public EnemyRunBehaviour enemyRunBehaviour;
        public EnemyAttackStanceBehaviour enemyAttackStanceBehaviour;
        public EnemyAttackBehaviour enemyAttackBehaviour;

        public EnemyBehaviour(EnemyWorker enemyWorker)
        {
            this.enemyWorker = enemyWorker;

            enemyIdleBehaviour = new EnemyIdleBehaviour(this);
            enemyRunBehaviour = new EnemyRunBehaviour(this);
            enemyAttackStanceBehaviour = new EnemyAttackStanceBehaviour(this);
            enemyAttackBehaviour = new EnemyAttackBehaviour(this);
        }

        public void GenerateBehaviourTree()
        {
            BehaviourNode idleNode = new BehaviourNode(enemyIdleBehaviour);
            BehaviourNode runNode = new BehaviourNode(enemyRunBehaviour);
            idleNode.behaviourNodes.Add(runNode);
            runNode.parentNode = idleNode;
            BehaviourNode attackStanceNode = new BehaviourNode(enemyAttackStanceBehaviour);
            runNode.behaviourNodes.Add(attackStanceNode);
            attackStanceNode.parentNode = runNode;
            BehaviourNode attackNode = new BehaviourNode(enemyAttackBehaviour);
            attackStanceNode.behaviourNodes.Add(attackNode);
            attackNode.parentNode = attackStanceNode;
            behaviourTree = new BehaviourTree(idleNode);
        }

        public void OnStart() => GenerateBehaviourTree();

        public void OnUpdate() => behaviourTree.Iterate();
    }
}
