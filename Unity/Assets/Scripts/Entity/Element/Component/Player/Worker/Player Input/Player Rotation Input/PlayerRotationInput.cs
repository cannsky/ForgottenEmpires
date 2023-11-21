using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerRotationInput
    {
        private PlayerInput playerInput;

        private Transform cameraTransform;

        private Vector3 oldRotationDirection, rotationDirection;

        public PlayerRotationInput(PlayerInput playerInput)
        {
            this.playerInput = playerInput;

            // Get the main camera's transform.
            cameraTransform = Camera.main.transform;
        }

        public void OnUpdate() => SendRotationInput();

        // Send the rotation request to the server if there is movement input
        public void SendRotationInput()
        {
            // If there is no movement input, return.
            if (playerInput.movementInput.x == 0 && playerInput.movementInput.y == 0) return;

            // Calculate the rotation direction based on camera orientation and movement input.
            rotationDirection = Vector3.zero;
            rotationDirection = cameraTransform.forward * playerInput.movementInput.y;
            rotationDirection += cameraTransform.right * playerInput.movementInput.x;
            rotationDirection.Normalize();
            rotationDirection.y = 0;

            // If the rotation direction has not changed, return.
            if (oldRotationDirection == rotationDirection) return;

            // Send the rotation request to the server.
            playerInput.playerWorker.player.CmdPlayerRotationRequest(rotationDirection);

            // Update the old rotation direction.
            oldRotationDirection = rotationDirection;
        }
    }
}