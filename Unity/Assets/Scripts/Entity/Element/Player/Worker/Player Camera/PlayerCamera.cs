using UnityEngine;

namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerCamera
    {
        private PlayerWorker playerWorker;
        private Transform cameraTransform;
        private Vector3 offset = new Vector3(0, 7, -4);
        private float angle = 60;

        public PlayerCamera (PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        public void OnStart() => FocusMainCameraToOwnerPlayer();

        public void OnUpdate()
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

        public void FollowOwnerPlayer() => cameraTransform.position = playerWorker.player.transform.position + offset;

        public void RotateCamera()
        {

        }
    }
}