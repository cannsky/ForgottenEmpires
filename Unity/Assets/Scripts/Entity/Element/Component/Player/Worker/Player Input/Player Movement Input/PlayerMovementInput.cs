using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerMovementInput
    {
        private PlayerInput playerInput;

        private Vector3 targetDirection, forward, right;

        private Transform cameraTransform;

        public PlayerMovementInput(PlayerInput playerInput)
        {
            this.playerInput = playerInput;

            // Get the main camera's transform.
            cameraTransform = Camera.main.transform;
        }

        public void OnUpdate() => SendMovementInput();

        //Send movement request to the server if there is a movement request
        public void SendMovementInput()
        {
            // If there is no movement input, return.
            if (playerInput.movementInput == Vector2.zero) return;

            // Calculate the forward and right directions based on the camera's orientation.
            forward = cameraTransform.forward;
            forward.y = 0;
            right = cameraTransform.right;
            right.y = 0;

            // Calculate the target movement direction.
            targetDirection = forward * playerInput.movementInput.y + right * playerInput.movementInput.x;
            targetDirection.Normalize();

            // Send the movement request to the server.
            playerInput.playerWorker.player.CmdPlayerMovementRequest(new Vector2(targetDirection.x, targetDirection.z));
        }
    }
}