namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class IronsmithWorker
    {
        public Ironsmith ironsmith;

        public IronsmithUpdate ironsmithUpdate;

        public IronsmithInteraction ironsmithInteraction;
        public IronsmithTrigger ironsmithTrigger;
        public IronsmithUI ironsmithUI;

        public IronsmithWorker(Ironsmith ironsmith)
        {
            this.ironsmith = ironsmith;

            ironsmithUpdate = new Ironsmithupdate(this);

            ironsmithInteraction = new IronsmithInteraction(this);
            ironsmithTrigger = new IronsmithTrigger(this);
            ironsmithUI = new IronsmithUI(this);
        }

        public void OnUpdate() => ironsmithUpdate.OnUpdate();
    }
}