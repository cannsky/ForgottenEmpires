using UnityEngine;

namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerMovement
    {
        private PlayerWorker playerWorker;

        private Vector3 velocity, normalVector;

        private float speed = 5f;

        public PlayerMovement(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        public void OnStart() => playerWorker.player.transform.position = new Vector3(playerWorker.player.transform.position.x, 1f, playerWorker.player.transform.position.z);

        public void OnUpdate() => Move();

        public void SetMovementPosition(Vector2 position) => velocity = Vector3.ProjectOnPlane(new Vector3(position.x, 0, position.y), normalVector);

        public void Move()
        {
            playerWorker.player.transform.position = Vector3.MoveTowards(
                playerWorker.player.transform.position,
                playerWorker.player.transform.position + velocity,
                Time.deltaTime * speed);
            ApplyFriction();
        }

        public void ApplyFriction()
        {
            if (velocity.magnitude > 0f) velocity -= velocity * 0.5f;
            else if (velocity.magnitude < 0f) velocity = Vector3.zero;
        }
    }
}