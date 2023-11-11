using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerMovement
    {
        private PlayerWorker playerWorker;

        private Vector3 velocity, normalVector;

        private float speed = 2f;

        public PlayerMovement(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        public void OnUpdate() => Move();

        // Set the movement position based on input
        public void SetMovementPosition(Vector2 position) => velocity = Vector3.ProjectOnPlane(new Vector3(position.x, 0, position.y), normalVector);

        // Move the player
        public void Move()
        {
            // Check if the velocity magnitude is zero
            if (velocity.magnitude == 0)
            {
                // If previously running, set the "Run" animation to false
                if (playerWorker.playerAnimation.animator.GetBool(Types.AnimationType.Run.ToString()))
                    playerWorker.playerAnimation.SetAnimation(Types.AnimationType.Run, false);
                return;
            }

            // Move the player's position based on velocity and speed
            playerWorker.player.transform.position = Vector3.MoveTowards(
                playerWorker.player.transform.position,
                playerWorker.player.transform.position + velocity,
                Time.deltaTime * speed);

            // Set the "Run" animation to true
            playerWorker.playerAnimation.SetAnimation(Types.AnimationType.Run, true);

            // Apply friction to gradually slow down the player
            ApplyFriction();
        }

        // Apply friction to slow down the player
        public void ApplyFriction()
        {
            // Decrease the velocity by a small amount
            velocity -= Vector3.one * 0.1f;

            // Ensure that velocity components do not become negative
            if (velocity.x < 0f || velocity.y < 0f || velocity.z < 0f) velocity = Vector3.zero;
        }
    }
}