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

        public void FocusMainCameraToOwnerPlayer()
        {
            cameraTransform = Camera.main.transform;
            RotateCamera();
        }

        public void RotateCamera()
        {
            yRotation += playerWorker.playerInput.cameraInput.x * rotationSpeed * Time.deltaTime;

            Vector3 cameraPosition = playerWorker.player.transform.position - (Quaternion.Euler(angle, yRotation, 0) * new Vector3(0, 0, cameraDistance));

            cameraTransform.position = cameraPosition;
            cameraTransform.LookAt(playerWorker.player.transform.position);
        }
    }
}