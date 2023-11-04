using ForgottenEmpires.Types;
using System.Collections;

namespace ForgottenEmpires.BehaviourTrees
{
    public class IdleBehaviour : Behaviour
    {
        public override bool GetPredicate() => true;

        public override void HandleBehaviour() => behaviourNode.behaviourTree.element.SetAnimation(AnimationType.Idle, true);

        public override IEnumerator ResetState() => throw new System.NotImplementedException();
    }
}