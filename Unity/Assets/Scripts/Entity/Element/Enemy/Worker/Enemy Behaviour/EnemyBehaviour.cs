using ForgottenEmpires.BehaviourTrees;
using ForgottenEmpires.Checkers;

namespace ForgottenEmpires.Entities.Elements.Enemies.Workers
{
    public class EnemyBehaviour
    {
        public EnemyWorker enemyWorker;

        // The behavior tree used to manage enemy behavior.
        public BehaviourTree behaviourTree;

        // Behavior components for the enemy.
        public EnemyIdleBehaviour enemyIdleBehaviour;
        public EnemyRunBehaviour enemyRunBehaviour;
        public EnemyAttackStanceBehaviour enemyAttackStanceBehaviour;
        public EnemyAttackBehaviour enemyAttackBehaviour;

        public EnemyBehaviour(EnemyWorker enemyWorker)
        {
            this.enemyWorker = enemyWorker;

            // Initialize behavior components.
            enemyIdleBehaviour = new EnemyIdleBehaviour(this);
            enemyRunBehaviour = new EnemyRunBehaviour(this);
            enemyAttackStanceBehaviour = new EnemyAttackStanceBehaviour(this);
            enemyAttackBehaviour = new EnemyAttackBehaviour(this);
        }

        // Generate the behavior tree for the enemy.
        public void GenerateBehaviourTree()
        {
            // Create behavior nodes and set up the hierarchy.
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

            // Create the behavior tree with the idle node as the root.
            behaviourTree = new BehaviourTree(idleNode);
        }

        public void OnStart() => GenerateBehaviourTree();

        // On each frame, iterate through the behavior tree.
        public void OnUpdate() => behaviourTree.Iterate();
    }
}
