using ForgottenEmpires.Entities.Elements.NPCs.Workers;
using ForgottenEmpires.Types;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.NPCs
{
    public class Merchant : NPC
    {
        private MerchantWorker merchantWorker;

        private void Start() => merchantWorker = new MerchantWorker(this);

        private void Update() => merchantWorker.OnUpdate();

        private void OnTriggerEnter(Collider other) => merchantWorker.merchantTrigger.OnTriggerEnter(other);

        private void OnTriggerExit(Collider other) => merchantWorker.merchantTrigger.OnTriggerExit(other);

        public override void Regenerate()
        {
            
        }

        public override void SetAnimation(AnimationType animationType, bool value)
        {
            
        }

        public override void TakeDamage(float damage)
        {
            
        }

        public override void Interact(Element element) => merchantWorker.merchantInteraction.OnInteraction(element);
    }
}