using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerAttackInput
    {
        private PlayerInput playerInput;

        public PlayerAttackInput(PlayerInput playerInput) => this.playerInput = playerInput;

        public void OnUpdate() => SendAttackInput();

        public void SendAttackInput()
        {
            if (playerInput.leftButton) playerInput.playerWorker.player.CmdPlayerAttackRequest();
        }
    }
}