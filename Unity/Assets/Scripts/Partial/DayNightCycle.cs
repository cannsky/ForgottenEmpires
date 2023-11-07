using UnityEngine;

namespace ForgottenEmpires.Partial
{
    public class DayNightCycle : MonoBehaviour
    {
        public float dayDuration = 120f; // Duration of a full day in seconds
        private float rotationSpeed;

        void Start()
        {
            rotationSpeed = 360f / dayDuration;
        }

        void Update()
        {
            // Rotate the light source to simulate the sun's movement
            transform.Rotate(rotationSpeed * Time.deltaTime, 0, 0);

            // Developer's note: This is a top down game.
            // If you need more specialized day night cycle.
            // You can add more code here to change the skybox, light intensity, etc.
        }
    }
}