using UnityEngine;
using ForgottenEmpires.Types;

namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
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

        public void SetAnimation(AnimationType animationType, bool value) => animator.SetBool(animationType.ToString(), value);
    }
}
