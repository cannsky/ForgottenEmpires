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

        public OptimizerWorker(Optimizer optimizer)
        {
            this.optimizer = optimizer;

            optimizerStart = new OptimizerStart(this);
            optimizerUpdate = new OptimizerUpdate(this);

            optimizerCulling = new OptimizerCulling(this);
            optimizerLevel = new OptimizerLevel();
            optimizerShadow = new OptimizerShadow();
        }

        public void OnStart() => optimizerStart.OnStart();

        public void OnUpdate() => optimizerUpdate.OnUpdate();
    }
}