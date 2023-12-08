using ForgottenEmpires.BehaviourTrees;
using ForgottenEmpires.Checkers;
using ForgottenEmpires.Managers.Server.Workers;
using ForgottenEmpires.Types;

namespace ForgottenEmpires.Entities.Elements.Enemies.Workers
{
    public class EnemyRunBehaviour : RunBehaviour
    {
        private EnemyBehaviour enemyBehaviour;

        public SingleRangeChecker singleRangeChecker;

        public EnemyRunBehaviour(EnemyBehaviour enemyBehaviour)
        {
            this.enemyBehaviour = enemyBehaviour;

            // Single range checker with 10f radius to start running
            singleRangeChecker = new SingleRangeChecker(enemyBehaviour.enemyWorker.enemy, 10f,
                ServerPlayerWorker.players);
        }

        public override bool GetPredicate()
        {
            return singleRangeChecker.Check();
            
        }

        // Set animation to run
        public override void HandleBehaviour()
        {
            enemyBehaviour.enemyWorker.enemyMovement.Move(singleRangeChecker.targets[0].transform.position);
            enemyBehaviour.enemyWorker.enemy.SetAnimation(AnimationType.Run, true);
        }
    }
}