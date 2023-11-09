using ForgottenEmpires.BehaviourTrees;
using ForgottenEmpires.Types;

namespace ForgottenEmpires.Entity.Elements.Enemies.Workers
{
    public class EnemyIdleBehaviour : IdleBehaviour
    {
        private EnemyBehaviour enemyBehaviour;

        public EnemyIdleBehaviour(EnemyBehaviour enemyBehaviour) => this.enemyBehaviour = enemyBehaviour;

        public override bool GetPredicate() => true;

        public override void HandleBehaviour() => enemyBehaviour.enemyWorker.enemy.SetAnimation(AnimationType.Idle, true);
    }
}
