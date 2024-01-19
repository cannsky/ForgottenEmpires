namespace ForgottenEmpires.Optimizers.Workers
{
    public class OptimizerUpdate
    {
        private OptimizerWorker optimizerWorker;

        public OptimizerStart(OptimizerWorker optimizerWorker) => this.optimizerWorker = optimizerWorker;

        public void OnUpdate()
        {
            if (optimizerWorker.optimizer.isClient) OnClientUpdate();
        }

        public void OnClientUpdate()
        {
            optimizerWorker.optimizerLevel.OnUpdate();
        }
    }
}