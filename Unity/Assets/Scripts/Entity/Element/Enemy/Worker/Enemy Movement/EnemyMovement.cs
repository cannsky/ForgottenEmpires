using UnityEngine;
using UnityEngine.AI;

namespace ForgottenEmpires.Entity.Elements.Enemies.Workers
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
            if (navMeshAgent.pathEndPosition != position) navMeshAgent.SetDestination(position);
        }
    }
}