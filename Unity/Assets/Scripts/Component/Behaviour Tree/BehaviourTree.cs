using ForgottenEmpires.Entities.Elements;
using UnityEngine;

namespace ForgottenEmpires.BehaviourTrees
{
    public class BehaviourTree
    {
        // The element associated with this behavior tree.
        public Element element;

        // The root node of the behavior tree and the currently active node.
        public BehaviourNode rootNode, currentNode;

        // Constructor for creating a behavior tree with a specified root node.
        public BehaviourTree(BehaviourNode rootNode) => this.rootNode = currentNode = rootNode;

        // Iterate through the behavior tree and execute the active node's behavior.
        public void Iterate() => (currentNode = currentNode.CheckNodes()).behaviour.HandleBehaviour();
    }
}