using ForgottenEmpires.Entities.Elements.NPCs.Workers;
using ForgottenEmpires.Types;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.NPCs
{
    public class GuildMaster : NPC
    {
        private GuildMasterWorker guildMasterWorker;

        private void Start() => guildMasterWorker = new GuildMasterWorker(this);

        private void Update() => guildMasterWorker.OnUpdate();

        private void OnTriggerEnter(Collider other) => guildMasterWorker.guildMasterTrigger.OnTriggerEnter(other);

        private void OnTriggerExit(Collider other) => guildMasterWorker.guildMasterTrigger.OnTriggerExit(other);

        public override void Regenerate()
        {
            
        }

        public override void SetAnimation(AnimationType animationType, bool value)
        {
            
        }

        public override void TakeDamage(float damage)
        {
            
        }

        public override void Interact(Element element) => guildMasterWorker.guildMasterInteraction.OnInteraction(element);
    }
}