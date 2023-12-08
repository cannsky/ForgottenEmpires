namespace ForgottenEmpires.Entities.Elements.Workers
{
    public class ElementUpdate
    {
        private ElementWorker elementWorker;

        public ElementUpdate(ElementWorker elementWorker) => this.elementWorker = elementWorker;

        public void OnUpdate()
        {
            if (elementWorker.element.isClient) ClientOnUpdate();
            if (elementWorker.element.isServer) ServerOnUpdate();
        }

        public void ClientOnUpdate()
        {
            if (elementWorker.element.isLocalPlayer) OwnerClientOnUpdate();
        }

        public void OwnerClientOnUpdate()
        {

        }

        public void ServerOnUpdate()
        {
            elementWorker.elementEffect.OnUpdate();
        }
    }
}