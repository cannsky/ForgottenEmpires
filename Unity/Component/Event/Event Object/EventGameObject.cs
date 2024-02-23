using UnityEngine;
using System.Collections.Generic;

namespace ForgottenEmpires.Components.Events
{
    public abstract class EventGameObject : MonoBehaviour
    {
        // ID of the event
        public int eventID;

        public void Start() => EventListWorker.events[eventID].eventGameObject = gameObject;
    }
}