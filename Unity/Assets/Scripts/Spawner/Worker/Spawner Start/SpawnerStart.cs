namespace ForgottenEmpires.Spawners.Workers
{
    public class SpawnerStart
    {
        private SpawnerWorker spawnerWorker;

        public SpawnerStart(SpawnerWorker spawnerWorker) => this.spawnerWorker = spawnerWorker;

        public void OnStart()
        {
            if (spawnerWorker.spawner.isServer) OnServerStart();
        }

        public void OnServerStart()
        {

        }
    }
}