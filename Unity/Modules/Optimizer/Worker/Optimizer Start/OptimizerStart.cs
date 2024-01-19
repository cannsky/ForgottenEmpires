namespace ForgottenEmpires.Optimizers.Workers
{
    public class OptimizerStart
    {
        private OptimizerWorker optimizerWorker;

        public OptimizerStart(OptimizerWorker optimizerWorker) => this.optimizerWorker = optimizerWorker;

        public void OnStart()
        {
            if (optimizerWorker.optimizer.isClient) OnClientStart();
        }

        public void OnClientStart()
        {
            optimizerWorker.optimizerLevel.OnStart();
        }
    }
}