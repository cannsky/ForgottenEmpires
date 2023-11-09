using ForgottenEmpires.Types;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.Enemies.Workers
{
    public class EnemyAnimation
    {
        private EnemyWorker enemyWorker;

        private Animator animator;

        public EnemyAnimation(EnemyWorker enemyWorker)
        {
            this.enemyWorker = enemyWorker;
            animator = enemyWorker.enemy.GetComponent<Animator>();
        }

        public void ResetAnimator()
        {
            animator.SetBool(AnimationType.Idle.ToString(), false);
            animator.SetBool(AnimationType.Run.ToString(), false);
            animator.SetBool(AnimationType.AttackStance.ToString(), false);
            animator.SetBool(AnimationType.Attack.ToString(), false);
        }

        public void SetAnimation(AnimationType animationType, bool value)
        {
            ResetAnimator();
            animator.SetBool(animationType.ToString(), value);
        }
    }
}