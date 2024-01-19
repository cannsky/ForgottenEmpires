namespace ForgottenEmpires.Optimizers.Workers
{
    public class OptimizerWorker
    {
        public Optimizer optimizer;

        public OptimizerStart optimizerStart;
        public OptimizerUpdate optimizerUpdate;

        public OptimizerLevel optimizerLevel;

        public SpawnerWorker(Optimizer optimizer)
        {
            this.optimizer = optimizer;

            optimizerStart = new OptimizerStart(this);
            optimizerUpdate = new OptimzerUpdate(this);

            optimizerLevel = new OptimizerLevel(this);
        }

        public void OnStart() => optimizerStart.OnStart();

        public void OnUpdate() => optimizerUpdate.OnUpdate();
    }
}