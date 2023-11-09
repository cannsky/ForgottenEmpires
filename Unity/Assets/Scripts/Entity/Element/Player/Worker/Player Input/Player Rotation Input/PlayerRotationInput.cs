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
            cameraTransform = Camera.main.transform;
        }

        public void OnUpdate() => SendRotationInput();

        public void SendRotationInput()
        {
            if (playerInput.movementInput.x == 0 && playerInput.movementInput.y == 0) return;
            rotationDirection = Vector3.zero;
            rotationDirection = cameraTransform.forward * playerInput.movementInput.y;
            rotationDirection += cameraTransform.right * playerInput.movementInput.x;
            rotationDirection.Normalize();
            rotationDirection.y = 0;
            if (oldRotationDirection == rotationDirection) return;
            playerInput.playerWorker.player.CmdPlayerRotationRequest(rotationDirection);
            oldRotationDirection = rotationDirection;
        }
    }
}