using UnityEngine;
using UnityEngine.AI;

namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerMovement
    {
        private PlayerWorker playerWorker;

        private Rigidbody rigidbody;

        private Vector3 velocity, normalVector;

        public PlayerMovement(PlayerWorker playerWorker)
        {
            this.playerWorker = playerWorker;
        }

        public void OnUpdate() => SmoothMovement();

        public void SetTargetMovement(Vector2 position) => velocity = Vector3.ProjectOnPlane(position, normalVector);

        public void SmoothMovement() => rigidbody.velocity = velocity;
    }
}