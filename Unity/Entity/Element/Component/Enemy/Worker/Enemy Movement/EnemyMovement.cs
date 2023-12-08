using UnityEngine;
using UnityEngine.AI;

namespace ForgottenEmpires.Entities.Elements.Enemies.Workers
{
    public class EnemyMovement
    {
        private EnemyWorker enemyWorker;

        // Navmesh agent attached to the enemy
        private NavMeshAgent navMeshAgent;

        public EnemyMovement(EnemyWorker enemyWorker) 
        {
            this.enemyWorker = enemyWorker;

            //Get enemy's navmesh agent from enemy gameobject
            navMeshAgent = enemyWorker.enemy.GetComponent<NavMeshAgent>();
        }

        // Move the enemy to the specified position.
        public void Move(Vector3 position)
        {
            // Check if the enemy is already going to the position requested
            if (navMeshAgent.pathEndPosition == position) return;

            // Set the destination for the NavMeshAgent and allow movement.
            navMeshAgent.SetDestination(position);
            navMeshAgent.isStopped = false;
        }

        // Stop the enemy's movement.
        public void StopMovement() => navMeshAgent.isStopped = true;
    }
}