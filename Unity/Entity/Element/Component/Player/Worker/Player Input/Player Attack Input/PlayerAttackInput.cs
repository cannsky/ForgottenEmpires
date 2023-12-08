using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerAttackInput
    {
        private PlayerInput playerInput;

        public PlayerAttackInput(PlayerInput playerInput) => this.playerInput = playerInput;

        public void OnUpdate() => SendAttackInput();

        // Send attack request to the server if left button is clicked
        public void SendAttackInput()
        {
            if (playerInput.leftButton) playerInput.playerWorker.player.CmdPlayerAttackRequest();
        }
    }
}