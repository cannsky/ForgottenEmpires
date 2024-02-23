namespace ForgottenEmpires.Managers.Event.Workers
{
    public class EventManagerWorker
    {
        public EventStartWorker eventStartWorker;
        public EventUpdateWorker eventUpdateWorker;

        public EventHandlerWorker eventHandlerWorker;
        public EventListworker eventListWorker;

        public ServerManagerWorker()
        {
            eventStartWorker = new EventStartWorker();
            eventUpdateWorker = new EventUpdateWorker();

            eventHandlerWorker = new EventHandlerWorker();
            eventListWorker = new EventListWorker();
        }

        public void OnStart() => eventStartWorker.OnStart();

        public void OnUpdate() => eventUpdateWorker.OnUpdate();
    }
}