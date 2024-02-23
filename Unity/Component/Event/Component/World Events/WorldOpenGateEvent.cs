using UnityEngine;
using System.Collections;

namespace ForgottenEmpires.Components.Events
{
    public class WorldOpenGateEvent : Event
    {
        // Rotation speed of the gate
        public float rotationSpeed = 45f;

        // Handle the current event
        public override bool HandleEvent()
        {
            // Start coroutine for smooth rotation
            EventManager.Instance.StartCoroutine(OpenGateOverTime());
            // Return true
            return true;
        }

        // Open gate over time
        public IEnumerator OpenGateOverTime()
        {
            // Start rotation of the event game object
            Quaternion startRotation = eventGameObject.transform.rotation;
            // End rotation after smooth rotation
            Quaternion endRotation = eventGameObject.transform.rotation * Quaternion.Euler(0, angle, 0);
            // Total rotation
            float totalRotation = 0;
            // For each frame change the angle based on passed time
            while (totalRotation < angle) {
                // Calculate angle that has to be increased from time passed
                float step = rotationSpeed * Time.deltaTime;
                // Change the angle with increased angle
                eventGameObject.transform.rotation = Quaternion.RotateTowards(eventGameObject.transform.rotation, endRotation, step);
                // Update total rotation
                totalRotation += step;
                // Wait until end of the frame
                yield return null;
            }
        }
    }
}