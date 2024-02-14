namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class IronsmithUpdate
    {
        private IronsmithWorker ironsmithWorker;

        public IronsmithUpdate(IronsmithWorker ironsmithWorker) => this.ironsmithWorker = ironsmithWorker;

        public void OnUpdate()
        {
            if (ironsmithWorker.ironsmith.isClient) OnClientUpdate();
            if (ironsmithWorker.ironsmith.isServer) OnServerUpdate();
        }

        public void OnClientUpdate()
        {

        }

        public void OnServerUpdate()
        {
            
        }
    }
}