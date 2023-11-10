using UnityEngine;
using UnityEngine.AI;

namespace ForgottenEmpires.Entities.Elements.Enemies.Workers
{
    public class EnemyMovement
    {
        private EnemyWorker enemyWorker;

        private NavMeshAgent navMeshAgent;

        public EnemyMovement(EnemyWorker enemyWorker) 
        {
            this.enemyWorker = enemyWorker;
            navMeshAgent = enemyWorker.enemy.GetComponent<NavMeshAgent>();
        }

        public void Move(Vector3 position)
        {
            if (navMeshAgent.pathEndPosition == position) return;
            navMeshAgent.SetDestination(position);
            navMeshAgent.isStopped = false;
        }

        public void StopMovement() => navMeshAgent.isStopped = true;
    }
}