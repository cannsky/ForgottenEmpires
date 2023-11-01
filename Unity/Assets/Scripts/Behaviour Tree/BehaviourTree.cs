using ForgottenEmpires.Entity.Elements;

namespace ForgottenEmpires.BehaviourTrees
{
    public class BehaviourTree
    {
        public Element element;

        public BehaviourNode rootNode, currentNode;

        public BehaviourTree(BehaviourNode rootNode) => this.rootNode = currentNode = rootNode;

        public void Iterate() => currentNode = currentNode.CheckPaths();
    }
}