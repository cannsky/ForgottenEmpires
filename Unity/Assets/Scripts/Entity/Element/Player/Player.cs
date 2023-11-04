using UnityEngine;
using ForgottenEmpires.Entity.Elements.PlayerWorkers;
using ForgottenEmpires.Entity.Elements.PlayerDatas;
using Mirror;
using ForgottenEmpires.Types;

namespace ForgottenEmpires.Entity.Elements
{
    public class Player : Element
    {
        public PlayerWorker playerWorker;
        public PlayerData playerData;

        public static int playerCount = 0;

        //private float health, totalHealth;

        private void Start()
        {
            playerWorker = new PlayerWorker(this);
            playerData = new PlayerData();
            isActive = isEnabled = true;
        }

        private void Update() => playerWorker.OnUpdate();

        private void LateUpdate() => playerWorker.OnLateUpdate();

        public override void TakeDamage(float damage) => playerWorker.playerStats.TakeDamage(damage);

        public override void SetAnimation(AnimationType animationType, bool value) => PlayerAnimationClientRPC(animationType, value);

        //Client Requests

        [Command] public void PlayerMovementRequest(Vector2 position) => playerWorker.playerMovement.SetMovementPosition(position);

        [Command] public void PlayerRotationRequest(Vector3 rotation) => playerWorker.playerRotation.SetTargetRotation(rotation);

        //Server Requests

        [ClientRpc] public void PlayerAnimationClientRPC(AnimationType animationType, bool value) => playerWorker.playerAnimation.SetAnimation(animationType, value);
    }
}