using ForgottenEmpires.Types;
using System.Collections;

namespace ForgottenEmpires.BehaviourTrees
{
    public class AttackStanceBehaviour : Behaviour
    {
        public override bool GetPredicate() => true;

        public override void HandleBehaviour() => behaviourNode.behaviourTree.element.SetAnimation(AnimationType.AttackStance, true);

        public override IEnumerator ResetState() => throw new System.NotImplementedException();
    }
}