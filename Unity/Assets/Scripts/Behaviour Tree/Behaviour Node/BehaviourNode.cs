using System.Collections.Generic;

namespace ForgottenEmpires.BehaviourTrees
{
    public abstract class BehaviourNode
    {
        public BehaviourTree behaviourTree;

        public BehaviourNode parentNode;

        public List<BehaviourNode> behaviourNodes;

        public Behaviour behaviour;

        public BehaviourNode newNode;

        public BehaviourNode CheckNodes()
        {
            foreach (BehaviourNode behaviourNode in behaviourNodes)
                if (behaviourNode.behaviour.GetPredicate()) return newNode;
            if (behaviour.GetPredicate()) return this;
            else return parentNode;
        }
    }
}