using ForgottenEmpires.BehaviourTrees;

namespace ForgottenEmpires.Entity.Elements.Enemies.Worker
{
    public class EnemyIdleBehaviour : IdleBehaviour
    {
        private EnemyBehaviour enemyBehaviour;

        public EnemyIdleBehaviour(EnemyBehaviour enemyBehaviour) => this.enemyBehaviour = enemyBehaviour;

        public override bool GetPredicate() => enemyBehaviour.singleRangeChecker.Check();

        public override void HandleBehaviour()
        {
            
        }
    }
}
