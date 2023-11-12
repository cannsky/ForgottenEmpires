using System.Collections.Generic;
using UnityEngine;

namespace ForgottenEmpires.BehaviourTrees
{
    public class BehaviourNode
    {
        public BehaviourTree behaviourTree;

        public BehaviourNode parentNode;

        public List<BehaviourNode> behaviourNodes;

        public Behaviour behaviour;

        // Constructor for creating a behavior node with a specified behavior.
        public BehaviourNode(Behaviour behaviour)
        {
            this.behaviour = behaviour;
            behaviourNodes = new List<BehaviourNode>();
        }

        // Check child nodes and select the next active node based on their predicates.
        public BehaviourNode CheckNodes()
        {
            // Check if the child node's behavior's predicate is true
            foreach (BehaviourNode behaviourNode in behaviourNodes)
                if (behaviourNode.behaviour.GetPredicate()) return behaviourNode;
            // Check the current node's behavior or return parent node
            if (behaviour.GetPredicate()) return this;
            else return parentNode;
        }
    }
}