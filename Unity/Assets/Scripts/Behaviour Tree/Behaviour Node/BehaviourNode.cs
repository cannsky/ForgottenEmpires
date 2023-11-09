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

        public BehaviourNode(Behaviour behaviour)
        {
            this.behaviour = behaviour;
            behaviourNodes = new List<BehaviourNode>();
        }

        public BehaviourNode CheckNodes()
        {
            foreach (BehaviourNode behaviourNode in behaviourNodes)
                if (behaviourNode.behaviour.GetPredicate()) return behaviourNode;
            if (behaviour.GetPredicate()) return this;
            else return parentNode;
        }
    }
}