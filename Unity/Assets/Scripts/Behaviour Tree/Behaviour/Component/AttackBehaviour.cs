using ForgottenEmpires.Types;

namespace ForgottenEmpires.BehaviourTrees
{
    public class AttackBehaviour : Behaviour
    {
        public override bool GetPredicate() => true;

        public override void HandleBehaviour() => behaviourNode.behaviourTree.element.SetAnimation(AnimationType.Attack, true);
    }
}