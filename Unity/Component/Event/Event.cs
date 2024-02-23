using UnityEngine;
using System.Collections.Generic;

namespace ForgottenEmpires.Components.Events
{
    public abstract class Event : ScriptableObject
    {
        // ID of the event
        public uint eventID;

        // Events that needs to be handled before this event
        public List<Event> requiredEvents;

        // Events that will be triggered after this event
        public List<Event> afterEvents;

        // If event handled before or not
        public bool isHandled;

        // Game Object of the event
        public GameObject eventGameObject;
        
        // Handle the current event
        public abstract bool HandleEvent();
    }
}