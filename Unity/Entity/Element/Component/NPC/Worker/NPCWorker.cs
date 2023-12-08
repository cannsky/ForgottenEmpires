namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class NPCWorker
    {
        public NPC npc;

        public NPCStart npcStart;

        public NPCAnimation npcAnimator;

        public NPCWorker(NPC npc)
        {
            this.npc = npc;

            npcStart = new NPCStart(this);

            npcAnimator = new NPCAnimation(this);
        }
    }
}