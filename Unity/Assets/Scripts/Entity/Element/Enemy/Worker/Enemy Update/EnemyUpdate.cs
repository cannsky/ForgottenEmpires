namespace ForgottenEmpires.Entities.Elements.Enemies.Workers
{
    public class EnemyUpdate
    {
        private EnemyWorker enemyWorker;

        public EnemyUpdate(EnemyWorker enemyWorker) => this.enemyWorker = enemyWorker;

        // General update
        public void OnUpdate()
        {
            if (enemyWorker.enemy.isClient) OnClientUpdate();
            if (enemyWorker.enemy.isServer) OnServerUpdate();
        }

        // Client update
        public void OnClientUpdate()
        {

        }

        // Server update
        public void OnServerUpdate()
        {
            enemyWorker.enemyBehaviour.OnUpdate();
        }
    }
}