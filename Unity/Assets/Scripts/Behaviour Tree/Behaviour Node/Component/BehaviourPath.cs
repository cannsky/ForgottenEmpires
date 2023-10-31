using System;

namespace ForgottenEmpires.BehaviourTrees
{
    public class BehaviourPath
    {
        public Func<bool> condition;

        public BehaviourNode nextNode;

        public BehaviourNode CheckPath()
        {
            if (condition != null && condition()) return nextNode;
            else return null;
        }
    }
}