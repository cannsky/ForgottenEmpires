using UnityEngine;
using System.Collections.Generic;

namespace ForgottenEmpires.Components.Events
{
    public abstract class EventPhysicsTrigger : MonoBehaviour
    {
        // ID of the event that will be triggered
        public uint eventID;

        public void OnTriggerEnter(Collider other)
        {
            // If triggered object is not player return
            if (other.tag != "Player") return;
            // Trigger the event based on event id
            EventHandlerWorker.HandleEvent(eventID);
        }
    }
}