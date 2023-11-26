namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class NPCStart
    {
        private NPCWorker npcWorker;

        public NPCStart(NPCWorker npcWorker) => this.npcWorker = npcWorker;

        public void OnStart()
        {
            if (npcWorker.npc.isClient) ClientOnStart();
            if (npcWorker.npc.isServer) ServerOnStart();
        }

        public void ClientOnStart()
        {
            
        }

        public void ServerOnStart()
        {
            
        }
    }
}