namespace ForgottenEmpires.Entities.Elements.Workers
{
    public class ElementEvent
    {
        private ElementWorker elementWorker;

        public ElementEvent(ElementWorker elementWorker) => this.elementWorker = elementWorker;

        public void DeathEvent()
        {
            // TODO: DISABLE PLAYER, RESPAWN ETC.
        }
    }
}