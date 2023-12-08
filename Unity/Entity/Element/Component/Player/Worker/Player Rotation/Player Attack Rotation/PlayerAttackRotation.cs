using ForgottenEmpires.Entities.Elements.Enemies.Workers;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerAttackRotation
    {
        public PlayerRotation playerRotation;

        private Vector3 targetDirection;

        private Quaternion lookRotation;

        private float rotationSpeed = 5f;

        public float rotationAngle;

        private bool isStartedRotating;

        public PlayerAttackRotation(PlayerRotation playerRotation)
        {
            this.playerRotation = playerRotation;

            // Add reset state to the player rotation for state change
            playerRotation.playerWorker.playerState.AddResetAction(StateType.Attacking, () => ResetState());
        }

        public void Rotate()
        {
            // Get target direction
            targetDirection =
                (playerRotation.playerWorker.playerAttack.target.transform.position -
                playerRotation.playerWorker.player.transform.position).normalized;

            // Get target rotation
            lookRotation = Quaternion.LookRotation(targetDirection);

            // Rotate towards the target smoothly over time.
            playerRotation.playerWorker.player.transform.rotation = Quaternion.Slerp(
                playerRotation.playerWorker.player.transform.rotation,
                lookRotation,
                Time.deltaTime * rotationSpeed);

            // If already rotating don't play rotation animation
            if (isStartedRotating) return;
            isStartedRotating = true;

            // Calculate rotation angle
            rotationAngle = Vector3.Angle(playerRotation.playerWorker.player.transform.forward, targetDirection);

            // Play rotation animation for rotation
            playerRotation.playerWorker.playerAnimation.PlayRotationAnimation();
        }

        // Reset state for started rotating
        public void ResetState() => isStartedRotating = false;
    }
}