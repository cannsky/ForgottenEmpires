using UnityEngine;

namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerCameraInput
    {
        private PlayerInput playerInput;

        float rotation;

        public PlayerCameraInput(PlayerInput playerInput)
        {
            this.playerInput = playerInput;
        }

        public void OnUpdate() => SendMovementInput();

        public void SendMovementInput()
        {
            if (!playerInput.rightButton) return; 
        }
    }
}