using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerRotation
    {
        private PlayerWorker playerWorker;

        private Quaternion targetRotation, smoothTargetRotation, oldTargetRotation;

        private float rotationSpeed = 5f;

        public PlayerRotation(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        public void OnUpdate() => SmoothRotate();

        public void SetTargetRotation(Vector3 rotation) => targetRotation = Quaternion.LookRotation(rotation);

        // Smoothly rotate the player towards the target rotation.
        public void SmoothRotate()
        {
            // Check if the target rotation has not changed.
            if (oldTargetRotation == targetRotation) return;

            // Store the current player rotation as the old target rotation.
            oldTargetRotation = playerWorker.player.transform.rotation;

            // Use Slerp to smoothly interpolate between current rotation and target rotation.
            smoothTargetRotation = Quaternion.Slerp(playerWorker.player.transform.rotation, targetRotation, rotationSpeed * Time.deltaTime);

            // Apply the smoothed rotation to the player.
            playerWorker.player.transform.rotation = smoothTargetRotation;
        }
    }
}