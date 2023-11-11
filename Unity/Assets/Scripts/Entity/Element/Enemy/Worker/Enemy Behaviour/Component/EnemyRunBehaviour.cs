using ForgottenEmpires.BehaviourTrees;
using ForgottenEmpires.Checkers;
using ForgottenEmpires.Managers.Server;
using ForgottenEmpires.Types;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.Enemies.Workers
{
    public class EnemyRunBehaviour : RunBehaviour
    {
        private EnemyBehaviour enemyBehaviour;

        public SingleRangeChecker singleRangeChecker;

        public EnemyRunBehaviour(EnemyBehaviour enemyBehaviour)
        {
            this.enemyBehaviour = enemyBehaviour;
            singleRangeChecker = new SingleRangeChecker(enemyBehaviour.enemyWorker.enemy, 10f,
                ServerManager.Instance.serverManagerWorker.serverPlayerWorker.players);
        }

        public override bool GetPredicate()
        {
            return singleRangeChecker.Check();
            
        }

        public override void HandleBehaviour()
        {
            enemyBehaviour.enemyWorker.enemyMovement.Move(singleRangeChecker.targets[0].transform.position);
            enemyBehaviour.enemyWorker.enemy.SetAnimation(AnimationType.Run, true);
        }
    }
}