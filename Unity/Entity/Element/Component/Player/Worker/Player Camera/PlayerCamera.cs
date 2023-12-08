using UnityEngine;
using UnityEngine.InputSystem;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerCamera
    {
        private PlayerWorker playerWorker;
        private Transform cameraTransform;
        private float angle = 60f, rotationSpeed = 140f, yRotation, cameraDistance = 7f;

        public PlayerCamera (PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        public void OnStart() => FocusMainCameraToOwnerPlayer();

        public void OnLateUpdate() => RotateCamera();

        // Focuses the main camera on the owner player.
        public void FocusMainCameraToOwnerPlayer()
        {
            // Get the camera's transform.
            cameraTransform = Camera.main.transform;

            // Rotate the camera.
            RotateCamera();
        }

        public void RotateCamera()
        {
            // Update the yRotation based on the camera input and rotation speed.
            yRotation += playerWorker.playerInput.cameraInput.x * rotationSpeed * Time.deltaTime;

            // Calculate the new camera position using the specified angle, rotation, and distance.
            Vector3 cameraPosition = playerWorker.player.transform.position - (Quaternion.Euler(angle, yRotation, 0) * new Vector3(0, 0, cameraDistance));

            // Set the camera's position and make it look at the player's position.
            cameraTransform.position = cameraPosition;
            cameraTransform.LookAt(playerWorker.player.transform.position);
        }
    }
}