namespace ForgottenEmpires.Optimizers.Workers
{
    public class OptimizerWorker
    {
        public Optimizer optimizer;

        public OptimizerStart optimizerStart;
        public OptimizerUpdate optimizerUpdate;

        public OptimizerCulling optimizerCulling;
        public OptimizerLevel optimizerLevel;
        public OptimizerShadow optimizerShadow;

        public SpawnerWorker(Optimizer optimizer)
        {
            this.optimizer = optimizer;

            optimizerStart = new OptimizerStart(this);
            optimizerUpdate = new OptimzerUpdate(this);

            optimizerCulling = new OptimizerCulling(this);
            optimizerLevel = new OptimizerLevel(this);
            optimizerShadow = new OptimizerShadow(this);
        }

        public void OnStart() => optimizerStart.OnStart();

        public void OnUpdate() => optimizerUpdate.OnUpdate();
    }
}