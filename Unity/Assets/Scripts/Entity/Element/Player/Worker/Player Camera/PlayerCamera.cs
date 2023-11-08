using UnityEngine;

namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerCamera
    {
        private PlayerWorker playerWorker;
        private Transform cameraTransform;
        private Vector3 offset = new Vector3(0, 7, -4);
        private float angle = 60f, dampingFactor = 2f;

        public PlayerCamera (PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        public void OnStart() => FocusMainCameraToOwnerPlayer();

        public void OnLateUpdate()
        {
            FollowOwnerPlayer();
            RotateCamera();
        }

        public void FocusMainCameraToOwnerPlayer()
        {
            cameraTransform = Camera.main.transform;
            cameraTransform.position = playerWorker.player.transform.position + offset;
            cameraTransform.rotation = Quaternion.Euler(angle, 0, 0);
        }

        public void FollowOwnerPlayer() => cameraTransform.position = Vector3.Lerp(cameraTransform.position, playerWorker.player.transform.position + offset, Time.deltaTime * dampingFactor);

        public void RotateCamera()
        {

        }
    }
}