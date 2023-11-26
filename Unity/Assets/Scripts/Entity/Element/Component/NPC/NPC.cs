using ForgottenEmpires.Entities.Elements.NPCs.Workers;

namespace ForgottenEmpires.Entities.Elements.NPCs
{
    public abstract class NPC : Element
    {
        private NPCWorker npcWorker;

        public NPC() => npcWorker = new NPCWorker(this);
    }
}