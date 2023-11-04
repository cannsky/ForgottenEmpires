namespace ForgottenEmpires.Spawners.Workers
{
    public class SpawnerUpdate
    {
        private SpawnerWorker spawnerWorker;

        public SpawnerUpdate(SpawnerWorker spawnerWorker) => this.spawnerWorker = spawnerWorker;

        public void OnUpdate()
        {
            if (spawnerWorker.spawner.isServer) OnServerUpdate();
        }

        public void OnServerUpdate()
        {
            spawnerWorker.spawnerGenerator.OnUpdate();
        }
    }
}