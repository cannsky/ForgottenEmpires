using ForgottenEmpires.Entities.Elements;
using ForgottenEmpires.Optimizers.Workers;
using Mirror;
using UnityEngine;

namespace ForgottenEmpires.Optimizers
{
    public class Optimizer : NetworkBehaviour
    {
        public OptimizerWorker optimizerWorker;

        private void Start()
        {
            this.optimizerWorker = new OptimizerWorker(this);
            optimizerWorker.OnStart();
        }

        private void Update() => optimizerWorker.OnUpdate();
    }
}