namespace ForgottenEmpires.BehaviourTrees
{
    public class BehaviourTree
    {
        public BehaviourNode rootNode, currentNode;

        public BehaviourTree(BehaviourNode rootNode) => this.rootNode = currentNode = rootNode;

        public void Iterate() => currentNode = currentNode.CheckPaths();
    }
}