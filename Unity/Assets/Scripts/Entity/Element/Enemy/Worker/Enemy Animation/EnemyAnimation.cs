using ForgottenEmpires.Types;
using UnityEngine;

namespace ForgottenEmpires.Entity.Elements.Enemies.Worker
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

        public void SetAnimation(AnimationType animationType, bool value) => animator.SetBool(animationType.ToString(), value);
    }
}