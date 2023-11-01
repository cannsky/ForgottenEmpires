namespace ForgottenEmpires.BehaviourTrees
{
    public class IdleBehaviour : Behaviour
    {
        public override bool GetPredicate() => true;

        public override void HandleBehaviour() => behaviourNode.behaviourTree.element.PlayAnimation("Idle");
    }
}