namespace ForgottenEmpires.Spawners.Workers
{
    public class SpawnerWorker
    {
        public Spawner spawner;

        public SpawnerStart spawnerStart;
        public SpawnerUpdate spawnerUpdate;

        public SpawnerGenerator spawnerGenerator;

        public SpawnerWorker(Spawner spawner)
        {
            this.spawner = spawner;

            spawnerStart = new SpawnerStart(this);
            spawnerUpdate = new SpawnerUpdate(this);

            spawnerGenerator = new SpawnerGenerator(this);
        }

        public void OnStart() => spawnerStart.OnStart();

        public void OnUpdate() => spawnerUpdate.OnUpdate();
    }
}