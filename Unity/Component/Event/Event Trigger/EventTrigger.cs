using UnityEngine;
using System.Collections.Generic;

namespace ForgottenEmpires.Components.Events
{
    public abstract class EventTrigger : MonoBehaviour
    {
        // ID of the event that will be triggered
        public uint eventID;

        // Trigger the event based on event id
        public void TriggerEvent() => EventHandlerWorker.HandleEvent(eventID);
    }
}