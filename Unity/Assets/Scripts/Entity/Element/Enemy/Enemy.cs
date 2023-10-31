using ForgottenEmpires.Entity.Elements.Enemies.Worker;

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
    }
}