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

        public void SetMovementPosition(Vector2 position) => velocity = Vector3.ProjectOnPlane(new Vector3(position.x, 0, position.y), normalVector);

        public void Move()
        {
            if (velocity.magnitude == 0)
            {
                if(playerWorker.playerAnimation.animator.GetBool(Types.AnimationType.Run.ToString()))
                    playerWorker.playerAnimation.SetAnimation(Types.AnimationType.Run, false);
                return;
            }
            playerWorker.player.transform.position = Vector3.MoveTowards(
                playerWorker.player.transform.position,
                playerWorker.player.transform.position + velocity,
                Time.deltaTime * speed);
            playerWorker.playerAnimation.SetAnimation(Types.AnimationType.Run, true);
            ApplyFriction();
        }

        public void ApplyFriction()
        {
            velocity -= Vector3.one * 0.1f;
            if (velocity.x < 0f || velocity.y < 0f || velocity.z < 0f) velocity = Vector3.zero;
        }
    }
}