using ForgottenEmpires.Entities.Elements.NPCs.Workers;
using ForgottenEmpires.Types;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.NPCs
{
    public class Ironsmith : NPC
    {
        private IronsmithWorker ironsmithWorker;

        private void Start() => ironsmithWorker = new IronsmithWorker(this);

        private void Update() => ironsmithWorker.OnUpdate();

        private void OnTriggerEnter(Collider other) => ironsmithWorker.ironsmithTrigger.OnTriggerEnter(other);

        private void OnTriggerExit(Collider other) => ironsmithWorker.ironsmithTrigger.OnTriggerExit(other);

        public override void Regenerate()
        {
            
        }

        public override void SetAnimation(AnimationType animationType, bool value)
        {
            
        }

        public override void TakeDamage(float damage)
        {
            
        }

        public override void Interact(Element element) => ironsmithWorker.ironsmithInteraction.OnInteraction(element);
    }
}