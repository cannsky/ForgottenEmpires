using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.Enemies.Workers
{
    public class EnemyRotation
    {
        private EnemyWorker enemyWorker;

        // Rotation speed of enemy
        private float rotationSpeed;

        // Enemy state for rotation
        private bool isRotating;

        public EnemyRotation(EnemyWorker enemyWorker) => this.enemyWorker = enemyWorker;

        public void OnUpdate()
        {
            if (isRotating) Rotate();
        }
        
        // Rotate enemy to the given position
        public void Rotate()
        {
            // Get target direction
            Vector3 targetDirection = 
                (enemyWorker.enemyBehaviour.behaviourTree.currentNode.behaviour.target.transform.position - 
                enemyWorker.enemy.transform.position).normalized;
            // Get target rotation
            Quaternion lookRotation = Quaternion.LookRotation(targetDirection);
            // Rotate towards the target smoothly over time.
            enemyWorker.enemy.transform.rotation = Quaternion.Slerp(
                enemyWorker.enemy.transform.rotation, 
                lookRotation, 
                Time.deltaTime * rotationSpeed);
        }

        // Start enemy's rotation
        public void StartRotation() => isRotating = true;

        // Stop enemy's rotation
        public void StopRotation() => isRotating = false;
    }
}