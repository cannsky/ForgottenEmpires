using UnityEngine;
using System.Collections;

namespace ForgottenEmpires.Components.Events
{
    public class WorldDestroyObjectEvent : Event
    {
        // Destroy delay of the game object
        public float destroyDelay = 1f;
        
        // Handle the current event
        public override bool HandleEvent()
        {
            // Start coroutine for smooth rotation
            EventManager.Instance.StartCoroutine(DestroyObjectAfterTime());
            // Return true
            return true;
        }

        // Destroy object after time
        public IEnumerator DestroyObjectAfterTime()
        {
            // Wait until delay ends
            yield return WaitForSeconds(destroyDelay);
            // Use Server Manager to destroy the object
            ServerManager.DestroyGameObject(eventGameObject);
        }
    }
}