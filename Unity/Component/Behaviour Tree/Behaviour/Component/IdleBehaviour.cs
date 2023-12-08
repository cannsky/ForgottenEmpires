using System.Collections;

namespace ForgottenEmpires.BehaviourTrees
{
    public class IdleBehaviour : Behaviour
    {
        public override bool GetPredicate() => true;

        public override void HandleBehaviour() { }

        public override IEnumerator ResetState() { yield return null; }
    }
}