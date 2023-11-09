using UnityEngine;
using ForgottenEmpires.Types;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerAnimation
    {
        private PlayerWorker playerWorker;

        private Animator animator;

        public PlayerAnimation(PlayerWorker playerWorker) 
        {
            this.playerWorker = playerWorker;
            animator = playerWorker.player.GetComponent<Animator>();
        }

        public void ResetAnimator()
        {
            animator.SetBool("Run", false);
            animator.SetBool("Attack", false);
        }

        public void SetAnimation(AnimationType animationType, bool value)
        {
            ResetAnimator();
            animator.SetBool(animationType.ToString(), value);
        }
    }
}
