namespace ForgottenEmpires.Entity.Elements.Enemies.Worker
{
    public class EnemyWorker
    {
        public Enemy enemy;

        public EnemyStart enemyStart;
        public EnemyUpdate enemyUpdate;

        public EnemyAnimation enemyAnimation;
        public EnemyBehaviour enemyBehaviour;

        public EnemyWorker(Enemy enemy)
        {
            this.enemy = enemy;

            enemyStart = new EnemyStart(this);
            enemyUpdate = new EnemyUpdate(this);

            enemyAnimation = new EnemyAnimation(this);
            enemyBehaviour = new EnemyBehaviour(this);
        }
    }
}
