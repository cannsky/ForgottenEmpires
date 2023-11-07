using UnityEngine;

namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerMovementInput
    {
        private PlayerInput playerInput;

        private Vector3 targetDirection;

        private Transform cameraTransform;

        public PlayerMovementInput(PlayerInput playerInput)
        {
            this.playerInput = playerInput;
            cameraTransform = Camera.main.transform;
        }

        public void OnUpdate() => SendMovementInput();

        public void SendMovementInput()
        {
            if (playerInput.movementInput == Vector2.zero) return;

            targetDirection = cameraTransform.forward * playerInput.movementInput.y;
            targetDirection += cameraTransform.right * playerInput.movementInput.x;
            targetDirection.Normalize();

            playerInput.playerWorker.player.CmdPlayerMovementRequest(new Vector2(playerInput.movementInput.x, playerInput.movementInput.y));
        }
    }
}