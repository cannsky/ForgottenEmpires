using System.Collections;

namespace ForgottenEmpires.BehaviourTrees
{
    public abstract class Behaviour
    {
        public BehaviourNode behaviourNode;

        public abstract bool GetPredicate();

        public abstract void HandleBehaviour();

        public abstract IEnumerator ResetState();
    }
}