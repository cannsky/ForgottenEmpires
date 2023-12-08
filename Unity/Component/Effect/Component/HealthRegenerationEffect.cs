using UnityEngine;

namespace ForgottenEmpires.Components.Effects
{
    public class HealthRegenerationEffect : Effect
    {
        public override void Apply() => owner.elementWorker.elementStats.UpdateHealth(value);
    }
}