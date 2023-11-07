﻿using UnityEngine;

namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerRotationInput
    {
        private PlayerInput playerInput;

        private Transform cameraTransform;

        private Vector3 oldRotationDirection, rotationDirection;

        public PlayerRotationInput(PlayerInput playerInput)
        {
            this.playerInput = playerInput;
            cameraTransform = Camera.main.transform;
        }

        public void OnUpdate() => SendRotationInput();

        public void SendRotationInput()
        {
            rotationDirection = Vector3.zero;
            rotationDirection = cameraTransform.forward * playerInput.movementInput.y;
            rotationDirection += cameraTransform.right * playerInput.movementInput.x;
            rotationDirection.Normalize();
            rotationDirection.y = 0;
            if(oldRotationDirection != rotationDirection)
            {
                playerInput.playerWorker.player.CmdPlayerRotationRequest(rotationDirection);
                oldRotationDirection = rotationDirection;
            }
        }
    }
}