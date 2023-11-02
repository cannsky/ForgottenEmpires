using UnityEngine;

namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerRotation
    {
        private PlayerWorker playerWorker;

        private Quaternion targetRotation, smoothTargetRotation, oldTargetRotation;

        private float rotationSpeed = 5f;

        public PlayerRotation(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        public void OnUpdate() => SmoothRotate();

        public void SetTargetRotation(Vector3 rotation) => targetRotation = Quaternion.LookRotation(rotation);

        public void SmoothRotate()
        {
            if (oldTargetRotation == targetRotation) return;
            oldTargetRotation = playerWorker.player.transform.rotation;
            smoothTargetRotation = Quaternion.Slerp(playerWorker.player.transform.rotation, targetRotation, rotationSpeed * Time.deltaTime);
            playerWorker.player.transform.rotation = smoothTargetRotation;
        }
    }
}