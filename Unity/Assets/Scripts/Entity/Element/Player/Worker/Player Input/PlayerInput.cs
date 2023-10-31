using System;
using UnityEngine;

namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerInput
    {
        public PlayerWorker playerWorker;

        public PlayerInputs playerInputs;

        public PlayerMovementInput playerMovementInput;

        private int terrainLayerMask;
        private Camera mainCamera;

        public bool leftButton, rightButton;

        public Vector3 position;

        public PlayerInput(PlayerWorker playerWorker)
        {
            this.playerWorker = playerWorker;

            playerInputs = new PlayerInputs();
            playerInputs.Player.LeftButton.performed += i => leftButton = true;
            playerInputs.Player.RightButton.performed += i => leftButton = true;

            playerMovementInput = new PlayerMovementInput(this);

            mainCamera = Camera.main;
            terrainLayerMask = LayerMask.GetMask("Terrain");
            playerInputs.Enable();
        }

        public void OnUpdate()
        {
            playerMovementInput.OnUpdate();
        }

        public void OnLateUpdate() => leftButton = rightButton = false;
    }
}