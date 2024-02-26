using UnityEngine;

namespace ForgottenEmpires.Components.Events
{
    public class PlayerDeathEvent : Event
    {
        // Handle the current event
        public override bool HandleEvent()
        {
            // Get player from event game object
            Player player = eventGameObject.GetComponent<Player>();
            // Set player is active to false
            player.isActive = false;
            // Set player is enabled to false
            player.isEnabled = false;
        }
    }
}