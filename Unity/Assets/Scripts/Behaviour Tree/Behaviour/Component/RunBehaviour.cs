using ForgottenEmpires.Types;
using System.Collections;

namespace ForgottenEmpires.BehaviourTrees
{
    public class RunBehaviour : Behaviour
    {
        public override bool GetPredicate() => true;

        public override void HandleBehaviour() => behaviourNode.behaviourTree.element.SetAnimation(AnimationType.Run, true);

        public override IEnumerator ResetState() => throw new System.NotImplementedException();
    }
}