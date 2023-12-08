using ForgottenEmpires.Entities.Elements.Enemies.Workers;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerRotation
    {
        public PlayerWorker playerWorker;

        public PlayerAttackRotation playerAttackRotation;
        public PlayerMovementRotation playerMovementRotation;

        public PlayerRotation(PlayerWorker playerWorker)
        {
            this.playerWorker = playerWorker;

            playerAttackRotation = new PlayerAttackRotation(this);
            playerMovementRotation = new PlayerMovementRotation(this);
        }

        public void OnUpdate() => Rotate();

        public void SetMovementTargetRotation(Vector3 rotation) => playerMovementRotation.targetRotation = Quaternion.LookRotation(rotation);

        public void Rotate()
        {
            if (playerWorker.playerState.CheckState(StateType.Moving)) playerMovementRotation.Rotate();
            else if (playerWorker.playerState.CheckState(StateType.Attacking)) playerAttackRotation.Rotate();
        }
    }
}