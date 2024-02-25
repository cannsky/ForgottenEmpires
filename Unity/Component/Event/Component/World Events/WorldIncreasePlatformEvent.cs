using UnityEngine;
using System.Collections;

namespace ForgottenEmpires.Components.Events
{
    public class WorldIncreasePlatformEvent : Event
    {
        // Movement speed of the platform
        public float movementSpeed = 10.0f;

        // Handle the current event
        public override bool HandleEvent()
        {
            // Start coroutine for smooth rotation
            EventManager.Instance.StartCoroutine(IncreasePlatformOverTime());
            // Return true
            return true;
        }

        public IEnumerator IncreasePlatformOverTime()
        {
            // Define start position of the platform
            Vector3 startPosition = eventGameObject.transform.position;
            // Set end position for platform to stop
            Vector3 endPosition = startPosition + Vector3.up * 10.0f;
            // Set time to zero
            float time = 0.0f;
            // Move platform to the specified position in 1 seconds
            while (time < 1.0f)
            {
                // Update new position with vector3 lerp
                eventGameObject.transform.position = Vector3.Lerp(startPosition, endPosition, time);
                // Increase time passed
                time += Time.deltaTime * movementSpeed;
                // Wait until the end of the frame
                yield return null;
            }
            // Make sure that platform is in the exact position
            eventGameObject.transform.position = endPosition;
        }
    }
}