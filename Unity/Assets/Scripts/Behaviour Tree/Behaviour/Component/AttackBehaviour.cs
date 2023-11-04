using ForgottenEmpires.Types;
using System.Collections;

namespace ForgottenEmpires.BehaviourTrees
{
    public class AttackBehaviour : Behaviour
    {
        public override bool GetPredicate() => true;

        public override void HandleBehaviour() => behaviourNode.behaviourTree.element.SetAnimation(AnimationType.Attack, true);

        public override IEnumerator ResetState() => throw new System.NotImplementedException();
    }
}