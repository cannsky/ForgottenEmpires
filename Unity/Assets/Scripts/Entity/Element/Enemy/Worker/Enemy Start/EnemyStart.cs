namespace ForgottenEmpires.Entity.Elements.Enemies.Worker
{
    public class EnemyStart
    {
        private EnemyWorker enemyWorker;

        public EnemyStart(EnemyWorker enemyWorker) => this.enemyWorker = enemyWorker;

        public void OnStart()
        {
            if (enemyWorker.enemy.isClient) OnClientStart();
            if (enemyWorker.enemy.isServer) OnServerStart();
        }

        public void OnClientStart()
        {

        }

        public void OnServerStart()
        {
            enemyWorker.enemyBehaviour.OnStart();
        }
    }
}