using System;

namespace ForgottenEmpires.BehaviourTrees
{
    public class BehaviourPath
    {
        public Func<bool> predicate;

        public BehaviourNode nextNode;

        public BehaviourNode CheckPath()
        {
            if (predicate != null && predicate()) return nextNode;
            else return null;
        }
    }
}