using ForgottenEmpires.Components.Events;
using System.Collections.Generic;

namespace ForgottenEmpires.Managers.Event.Workers
{
    public class EventListWorker
    {
        // Static variable to keep track of the total event count
        public static uint eventCount;

        // Dictionary to store events with unique ID
        public static Dictionary<uint, Event> events;

        // Create new dictionary at the start of the event manager
        public EventListWorker() => events = new Dictionary<uint, Event>();

        // Method to add a new event to the dictionary
        public static void AddEvent(Event event) => events.Add(event.eventID, event);

        // Method to remove an event from dictionary
        public static void RemoveEvent(uint id) => events.Remove(id);
    }
}