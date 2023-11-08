using UnityEngine;

namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerInput
    {
        public PlayerWorker playerWorker;

        public PlayerInputs playerInputs;

        public PlayerCameraInput playerCameraInput;
        public PlayerMovementInput playerMovementInput;
        public PlayerRotationInput playerRotationInput;

        public Vector2 movementInput, cameraInput;

        public bool leftButton, rightButton;

        public Vector3 position;

        public PlayerInput(PlayerWorker playerWorker)
        {
            this.playerWorker = playerWorker;

            playerInputs = new PlayerInputs();
            playerInputs.Player.LeftButton.performed += i => leftButton = true;
            playerInputs.Player.RightButton.performed += i => rightButton = true;
            playerInputs.Player.RightButton.canceled += i => rightButton = false;
            playerInputs.Player.Movement.performed += i => movementInput = i.ReadValue<Vector2>();
            playerInputs.Player.Rotation.performed += i => cameraInput = i.ReadValue<Vector2>();

            playerCameraInput = new PlayerCameraInput(this);
            playerMovementInput = new PlayerMovementInput(this);
            playerRotationInput = new PlayerRotationInput(this);

            playerInputs.Enable();
        }

        public void OnUpdate()
        {
            playerMovementInput.OnUpdate();
            playerRotationInput.OnUpdate();
        }

        public void OnLateUpdate() => leftButton = false;
    }
}