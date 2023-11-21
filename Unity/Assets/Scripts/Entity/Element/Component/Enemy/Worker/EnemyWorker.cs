namespace ForgottenEmpires.Entities.Elements.Enemies.Workers
{
    public class EnemyWorker
    {
        public Enemy enemy;

        public EnemyStart enemyStart;
        public EnemyUpdate enemyUpdate;

        public EnemyAnimation enemyAnimation;
        public EnemyBehaviour enemyBehaviour;
        public EnemyDamage enemyDamage;
        public EnemyMovement enemyMovement;
        public EnemyRotation enemyRotation;

        public EnemyWorker(Enemy enemy)
        {
            this.enemy = enemy;

            enemyStart = new EnemyStart(this);
            enemyUpdate = new EnemyUpdate(this);

            enemyAnimation = new EnemyAnimation(this);
            enemyBehaviour = new EnemyBehaviour(this);
            enemyDamage = new EnemyDamage(this);
            enemyMovement = new EnemyMovement(this);
            enemyRotation = new EnemyRotation(this);
        }

        public void OnStart() => enemyStart.OnStart();

        public void OnUpdate() => enemyUpdate.OnUpdate();
    }
}
