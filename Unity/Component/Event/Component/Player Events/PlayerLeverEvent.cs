using UnityEngine;

namespace ForgottenEmpires.Components.Events
{
    public class PlayerLeverEvent : Event
    {
        // Handle the current event
        public override bool HandleEvent()
        {
            if (isTriggered) return false;
            isTriggered = true;
            return true;
        }
    }
}