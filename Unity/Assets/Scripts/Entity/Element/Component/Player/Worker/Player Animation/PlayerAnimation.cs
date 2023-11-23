using UnityEngine;
using ForgottenEmpires.Types;
using ForgottenEmpires.Entities.Elements.Enemies.Workers;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerAnimation
    {
        private PlayerWorker playerWorker;

        // Animator component for player animations.
        public Animator animator;

        public PlayerAnimation(PlayerWorker playerWorker) 
        {
            this.playerWorker = playerWorker;

            // Get the Animator component from the player gameobject.
            animator = playerWorker.player.GetComponent<Animator>();
        }

        // Reset animator parameters
        public void ResetAnimator()
        {
            animator.SetBool("Run", false);
            animator.SetBool("Attack", false);
        }

        public void SetAnimation(AnimationType animationType, bool value)
        {
            // Reset animator
            ResetAnimator();

            // Set animation to given value
            animator.SetBool(animationType.ToString(), value);
        }

        // Play animations for rotation
        public void PlayRotationAnimation()
        {
            // If rotation angle is lower than 45 degrees, Play 45-degree rotation animation
            if (playerWorker.playerRotation.playerAttackRotation.rotationAngle <= 45) SetAnimation(AnimationType.Rotate45, true);
            
            // If rotation angle is lower than 90 degrees, Play 90-degree rotation animation
            else if (playerWorker.playerRotation.playerAttackRotation.rotationAngle <= 90) SetAnimation(AnimationType.Rotate90, true);
        }
    }
}
