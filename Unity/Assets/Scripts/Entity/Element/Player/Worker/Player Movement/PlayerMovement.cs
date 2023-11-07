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
            rigidbody = playerWorker.player.GetComponent<Rigidbody>();
        }

        public void OnUpdate() => Move();

        public void SetMovementPosition(Vector2 position) => velocity = Vector3.ProjectOnPlane(new Vector3(position.x, 0, position.y), normalVector);

        public void Move()
        {
            rigidbody.velocity = velocity;
            ApplyFriction();
        }

        public void ApplyFriction()
        {
            if (velocity.magnitude > 0f) velocity -= velocity * 0.5f;
            else if (velocity.magnitude < 0f) velocity = Vector3.zero;
        }
    }
}