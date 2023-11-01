namespace ForgottenEmpires.Entity.Elements.Enemies.Worker
{
    public class EnemyWorker
    {
        public Enemy enemy;

        public EnemyAnimation enemyAnimation;
        public EnemyBehaviour enemyBehaviour;

        public EnemyWorker(Enemy enemy)
        {
            this.enemy = enemy;

            enemyAnimation = new EnemyAnimation(this);
            enemyBehaviour = new EnemyBehaviour(this);
        }
    }
}
