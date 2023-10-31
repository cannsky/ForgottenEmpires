using UnityEngine;

namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerMovementInput
    {
        private PlayerInput playerInput;

        private LayerMask groundLayer;

        private RaycastHit hit;

        public PlayerMovementInput(PlayerInput playerInput)
        {
            this.playerInput = playerInput;
            groundLayer = LayerMask.GetMask("Ground");
        }

        public void OnUpdate()
        {
            if (!playerInput.playerWorker.player.isOwned || !playerInput.rightButton) return;
            if (Physics.Raycast(Camera.main.ScreenPointToRay(Input.mousePosition), out hit, Mathf.Infinity, groundLayer)) playerInput.playerWorker.player.PlayerMovementRequest(new Vector2(hit.point.x, hit.point.z));
        }
    }
}