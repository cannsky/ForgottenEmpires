using UnityEngine;

namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerMovementInput
    {
        private PlayerInput playerInput;

        private Vector3 targetDirection, forward, right;

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

            forward = cameraTransform.forward;
            forward.y = 0;
            right = cameraTransform.right;
            right.y = 0;

            targetDirection = forward * playerInput.movementInput.y + right * playerInput.movementInput.x;
            targetDirection.Normalize();

            playerInput.playerWorker.player.CmdPlayerMovementRequest(new Vector2(targetDirection.x, targetDirection.z));
        }
    }
}