using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerMovementRotation
    {
        private PlayerRotation playerRotation;

        public Quaternion targetRotation, smoothTargetRotation, oldTargetRotation;

        private float rotationSpeed = 5f;

        public PlayerMovementRotation(PlayerRotation playerRotation) => this.playerRotation = playerRotation;

        public void Rotate()
        {
            // Check if the target rotation has not changed.
            if (oldTargetRotation == targetRotation) return;

            // Store the current player rotation as the old target rotation.
            oldTargetRotation = playerRotation.playerWorker.player.transform.rotation;

            // Use Slerp to smoothly interpolate between current rotation and target rotation.
            smoothTargetRotation = Quaternion.Slerp(playerRotation.playerWorker.player.transform.rotation, targetRotation, rotationSpeed * Time.deltaTime);

            // Apply the smoothed rotation to the player.
            playerRotation.playerWorker.player.transform.rotation = smoothTargetRotation;
        }
    }
}