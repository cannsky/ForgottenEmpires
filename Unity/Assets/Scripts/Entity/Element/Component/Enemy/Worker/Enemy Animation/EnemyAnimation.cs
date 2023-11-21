using ForgottenEmpires.Types;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.Enemies.Workers
{
    public class EnemyAnimation
    {
        // Enemy worker of the enemy animation
        private EnemyWorker enemyWorker;

        // Animator component used for animations.
        private Animator animator;

        public EnemyAnimation(EnemyWorker enemyWorker)
        {
            this.enemyWorker = enemyWorker;

            // Get the Animator component from enemy gameobject
            animator = enemyWorker.enemy.GetComponent<Animator>();
        }

        // Reset all animator parameters to false
        public void ResetAnimator()
        {
            animator.SetBool(AnimationType.Idle.ToString(), false);
            animator.SetBool(AnimationType.Run.ToString(), false);
            animator.SetBool(AnimationType.AttackStance.ToString(), false);
            animator.SetBool(AnimationType.Attack.ToString(), false);
        }

        // Set the specified animation type parameter to the given value and resets other animations.
        public void SetAnimation(AnimationType animationType, bool value)
        {
            // Reset animator.
            ResetAnimator();

            // Set the specified animation.
            animator.SetBool(animationType.ToString(), value);
        }

        // Play animations for rotation
        public void PlayRotationAnimation()
        {
            // If rotation angle is lower than 45 degrees, Play 45-degree rotation animation
            if (enemyWorker.enemyRotation.rotationAngle <= 45) SetAnimation(AnimationType.Rotate45, true);
            // If rotation angle is lower than 90 degrees, Play 90-degree rotation animation
            else if (enemyWorker.enemyRotation.rotationAngle <= 90) SetAnimation(AnimationType.Rotate90, true);
        }
    }
}