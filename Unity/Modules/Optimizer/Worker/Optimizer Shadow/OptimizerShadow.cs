using UnityEngine;

namespace ForgottenEmpires.Optimizers.Workers {
    public class OptimizerShadow
    {
        // Enum for different levels of shadow quality
        private enum ShadowQuality
        {
            All, // High-quality soft shadows
            HardOnly, // Medium-quality hard shadows
            Disable // No shadows
        }

        public Light mainLight; // Reference to the main directional light in the scene
        public float highQualityDistance = 30.0f; // Max distance for high-quality shadows
        public float mediumQualityDistance = 60.0f; // Max distance for medium-quality shadows

        private void OnUpdate()
        {
            // If mainLight is not assigned, exit the function to avoid errors
            if (mainLight == null) return;

            // Calculate the distance from the main camera to the light source
            float distanceToLight = Vector3.Distance(Camera.main.transform.position, mainLight.transform.position);

            // Determine shadow quality based on the distance to the light source
            if (distanceToLight <= highQualityDistance) SetShadowQuality(ShadowQuality.All);
            else if (distanceToLight <= mediumQualityDistance) SetShadowQuality(ShadowQuality.HardOnly);
            else SetShadowQuality(ShadowQuality.Disable);
        }

        // Function to set shadow quality based on the specified quality level
        private void SetShadowQuality(ShadowQuality quality)
        {
            switch (quality)
            {
                case ShadowQuality.All:
                    // High-quality soft shadows
                    mainLight.shadows = LightShadows.Soft;
                    QualitySettings.shadowResolution = ShadowResolution.VeryHigh;
                    break;
                case ShadowQuality.HardOnly:
                    // Medium-quality hard shadows
                    mainLight.shadows = LightShadows.Hard;
                    QualitySettings.shadowResolution = ShadowResolution.High;
                    break;
                case ShadowQuality.Disable:
                    // Disable shadows
                    mainLight.shadows = LightShadows.None;
                    break;
            }
        }
    }
}