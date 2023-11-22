namespace ForgottenEmpires.Entities.Elements.Workers
{
    public class ElementWorker
    {
        public Element element;

        public ElementUpdate elementUpdate;

        public ElementEffect elementEffect;
        public ElementEvent elementEvent;
        public ElementStats elementStats;

        public ElementWorker(Element element)
        {
            this.element = element;

            elementUpdate = new ElementUpdate(this);

            elementEffect = new ElementEffect(this);
            elementEvent = new ElementEvent(this);
            elementStats = new ElementStats(this);
        }

        public void OnUpdate() => elementUpdate.OnUpdate();
    }
}