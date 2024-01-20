using UnityEngine;

namespace ForgottenEmpires.Managers.Server.Workers {
    public class DayNightWorker
    {
        // Reference to the directional light in the scene
        public static Light sun;

        // Length of a full day in seconds in the game
        public static float secondsInFullDay = 120f;

        // Keeps track of the current time of day [0,1], where 0 is midnight and 0.5 is noon
        [Range(0, 1)] public static float currentTimeOfDay = 0;

        // A multiplier to speed up or slow down the cycle
        public static float timeMultiplier = 1f;

        // Store the intensity of the sun at the start of the game
        public static float sunInitialIntensity;

        public static void OnStart()
        {
            // Initialize the sun's intensity
            sunInitialIntensity = sun.intensity;
        }

        public static void OnUpdate()
        {
            // Update the sun's position and intensity based on the current time of day
            UpdateSun();

            // Increment the time of day based on the time passed, scaled by the seconds in a full day
            currentTimeOfDay += (Time.deltaTime / secondsInFullDay) * timeMultiplier;

            // If a full day has passed, reset to the start of the day
            if (currentTimeOfDay >= 1) currentTimeOfDay = 0;
        }

        public static void UpdateSun()
        {
            // Adjust the sun's rotation according to the time of day
            sun.transform.localRotation = Quaternion.Euler((currentTimeOfDay * 360f) - 90, 170, 0);

            // Intensity multiplier, determines the brightness of the sun
            float intensityMultiplier = 1;

            // Change the intensity of the sun according to the time of day
            // Sun is not visible at night
            if (currentTimeOfDay <= 0.23f || currentTimeOfDay >= 0.75f) intensityMultiplier = 0;
            // Fade in the sun at dawn
            else if (currentTimeOfDay <= 0.25f) intensityMultiplier = Mathf.Clamp01((currentTimeOfDay - 0.23f) * (1 / 0.02f));
            // Fade out the sun at dusk
            else if (currentTimeOfDay >= 0.73f) intensityMultiplier = Mathf.Clamp01(1 - ((currentTimeOfDay - 0.73f) * (1 / 0.02f)));

            // Apply the intensity to the sun's intensity
            sun.intensity = sunInitialIntensity * intensityMultiplier;
        }
    }
}