using System.Collections.Generic;

namespace ForgottenEmpires.BehaviourTrees
{
    public abstract class BehaviourNode
    {
        public BehaviourTree behaviourTree;

        public BehaviourNode parentNode;

        public List<BehaviourNode> behaviourNodes;

        public Behaviour behaviour;

        public BehaviourNode returnNode;

        public BehaviourNode CheckNodes()
        {
            foreach (BehaviourNode behaviourNode in behaviourNodes)
                if (behaviourNode.behaviour.GetPredicate()) return returnNode;
            return this;
        }
    }
}