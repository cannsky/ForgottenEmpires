namespace ForgottenEmpires.Managers.Event.Workers
{
    public class EventHandlerWorker
    {
        public virtual void HandleEvent(uint eventID)
        {
            // Get the event
            Event event = EventListWorker.events[eventID];
            // Check each required event to be true
            foreach (Event requiredEvent in event.requiredEvents) if(!requiredEvent.HandleEvent()) return;
            // Handle Event
            if(!event.HandleEvent()) return;
            // Handle all after events of this event
            foreach (Event afterEvent in event.afterEvents) afterEvent.HandleEvent();
        }
    }
}