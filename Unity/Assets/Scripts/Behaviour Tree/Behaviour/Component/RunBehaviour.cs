using ForgottenEmpires.Types;

namespace ForgottenEmpires.BehaviourTrees
{
    public class RunBehaviour : Behaviour
    {
        public override bool GetPredicate() => true;

        public override void HandleBehaviour() => behaviourNode.behaviourTree.element.SetAnimation(AnimationType.Run, true);
    }
}