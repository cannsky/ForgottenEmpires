namespace ForgottenEmpires.Entities.Elements.Enemies.Workers
{
    public class EnemyStart
    {
        private EnemyWorker enemyWorker;

        public EnemyStart(EnemyWorker enemyWorker) => this.enemyWorker = enemyWorker;

        // General start
        public void OnStart()
        {
            if (enemyWorker.enemy.isClient) OnClientStart();
            if (enemyWorker.enemy.isServer) OnServerStart();
        }

        // Client start
        public void OnClientStart()
        {

        }

        // Server start
        public void OnServerStart()
        {
            enemyWorker.enemyBehaviour.OnStart();
        }
    }
}