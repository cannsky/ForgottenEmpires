﻿using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerInput
    {
        public PlayerWorker playerWorker;

        // Input actions of the player.
        public PlayerInputs playerInputs;

        // Inputs for specific player actions.
        public PlayerAttackInput playerAttackInput;
        public PlayerMovementInput playerMovementInput;
        public PlayerRotationInput playerRotationInput;

        public Vector2 movementInput, cameraInput;

        public bool leftButton, rightButton, interact;

        public Vector3 position;

        public PlayerInput(PlayerWorker playerWorker)
        {
            this.playerWorker = playerWorker;

            // Initialize input actions and define event handlers for specific actions.
            playerInputs = new PlayerInputs();
            playerInputs.Player.LeftButton.performed += i => leftButton = true;
            playerInputs.Player.RightButton.performed += i => rightButton = true;
            playerInputs.Player.RightButton.canceled += i => rightButton = false;
            playerInputs.Player.Interact.performed += i => interact = true;
            playerInputs.Player.Movement.performed += i => movementInput = i.ReadValue<Vector2>();
            playerInputs.Player.Rotation.performed += i => cameraInput = i.ReadValue<Vector2>();

            // Initialize specific inputs
            playerAttackInput = new PlayerAttackInput(this);
            playerMovementInput = new PlayerMovementInput(this);
            playerRotationInput = new PlayerRotationInput(this);

            // Enable input actions.
            playerInputs.Enable();
        }

        public void OnUpdate()
        {
            playerAttackInput.OnUpdate();
            playerMovementInput.OnUpdate();
            playerRotationInput.OnUpdate();
        }

        public void OnLateUpdate() => leftButton = interact = false;
    }
}