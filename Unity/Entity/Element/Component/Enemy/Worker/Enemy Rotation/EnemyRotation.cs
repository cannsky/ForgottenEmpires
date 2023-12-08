using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.Enemies.Workers
{
    public class EnemyRotation
    {
        private EnemyWorker enemyWorker;

        // Rotation speed of enemy
        private float rotationSpeed;

        // Rotation angle of the enemy
        public float rotationAngle;

        // Enemy state for rotation
        private bool isRotating, isStartedRotating;

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

            // If already rotating don't play rotation animation
            if (isStartedRotating) return;
            isStartedRotating = true;

            // Calculate rotation angle
            rotationAngle = Vector3.Angle(enemyWorker.enemy.transform.forward, targetDirection);

            // Play rotation animation for rotation
            enemyWorker.enemyAnimation.PlayRotationAnimation();
        }

        // Start enemy's rotation
        public void StartRotation() => isRotating = isStartedRotating = true;

        // Stop enemy's rotation
        public void StopRotation() => isRotating = false;
    }
}