namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class IronsmithInteraction
    {
        private IronsmithWorker ironsmithWorker;

        public IronsmithInteraction(IronsmithWorker ironsmithWorker) => this.ironsmithWorker = ironsmithWorker;

        public void OnInteraction(Element element) => ironsmithWorker.ironsmithUI.ToggleUI();
    }
}