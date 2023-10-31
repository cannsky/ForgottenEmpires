using System.Collections.Generic;

namespace ForgottenEmpires.BehaviourTrees
{
    public abstract class BehaviourNode
    {
        public BehaviourNode parentNode;

        public List<BehaviourPath> behaviourPaths;

        private BehaviourNode returnNode;

        public BehaviourNode CheckPaths()
        {
            foreach (BehaviourPath behaviourPath in behaviourPaths)
                if ((returnNode = behaviourPath.CheckPath()) != null) return returnNode;
            return parentNode;
        }
    }
}