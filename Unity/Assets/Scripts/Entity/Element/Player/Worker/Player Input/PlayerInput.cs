using System;
using UnityEngine;

namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerInput
    {
        public PlayerWorker playerWorker;

        public PlayerInputs playerInputs;

        public PlayerMovementInput playerMovementInput;

        public Vector2 movementInput;

        public bool leftButton, rightButton;

        public Vector3 position;

        public PlayerInput(PlayerWorker playerWorker)
        {
            this.playerWorker = playerWorker;

            playerInputs = new PlayerInputs();
            playerInputs.Player.LeftButton.performed += i => leftButton = true;
            playerInputs.Player.RightButton.performed += i => leftButton = true;
            playerInputs.Player.Movement.performed += i => movementInput = i.ReadValue<Vector2>();

            playerMovementInput = new PlayerMovementInput(this);

            playerInputs.Enable();
        }

        public void OnUpdate()
        {
            playerMovementInput.OnUpdate();
        }

        public void OnLateUpdate() => leftButton = rightButton = false;
    }
}