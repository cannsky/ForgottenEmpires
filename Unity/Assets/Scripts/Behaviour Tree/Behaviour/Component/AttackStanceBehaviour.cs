using ForgottenEmpires.Types;

namespace ForgottenEmpires.BehaviourTrees
{
    public class AttackStanceBehaviour : Behaviour
    {
        public override bool GetPredicate() => true;

        public override void HandleBehaviour() => behaviourNode.behaviourTree.element.SetAnimation(AnimationType.Idle, true);
    }
}