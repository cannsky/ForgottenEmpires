using ForgottenEmpires.Entity.Elements.Enemies.Worker;
using ForgottenEmpires.Types;

namespace ForgottenEmpires.Entity.Elements.Enemies
{
    public class Enemy : Element
    {
        public EnemyWorker enemyWorker;

        private void Start()
        {
            enemyWorker = new EnemyWorker(this);
        }

        public override void TakeDamage(float damage)
        {
            //Not implemented yet.
        }

        public override void SetAnimation(AnimationType animationType, bool value)
        {
            throw new System.NotImplementedException();
        }
    }
}