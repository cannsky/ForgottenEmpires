namespace ForgottenEmpires.Entity.Elements.Enemies.Worker
{
    public class EnemyUpdate
    {
        private EnemyWorker enemyWorker;

        public EnemyUpdate(EnemyWorker enemyWorker) => this.enemyWorker = enemyWorker;

        public void OnUpdate()
        {
            if (enemyWorker.enemy.isClient) OnClientUpdate();
            if (enemyWorker.enemy.isServer) OnServerUpdate();
        }

        public void OnClientUpdate()
        {

        }

        public void OnServerUpdate()
        {
            enemyWorker.enemyBehaviour.OnUpdate();
        }
    }
}