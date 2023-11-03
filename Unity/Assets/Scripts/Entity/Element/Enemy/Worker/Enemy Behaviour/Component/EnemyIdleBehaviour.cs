using ForgottenEmpires.BehaviourTrees;

namespace ForgottenEmpires.Entity.Elements.Enemies.Workers
{
    public class EnemyIdleBehaviour : IdleBehaviour
    {
        private EnemyBehaviour enemyBehaviour;

        public EnemyIdleBehaviour(EnemyBehaviour enemyBehaviour) => this.enemyBehaviour = enemyBehaviour;

        public override bool GetPredicate() => true;
    }
}
