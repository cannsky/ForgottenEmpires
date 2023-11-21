using UnityEngine;
using ForgottenEmpires.Types;

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
    }
}
