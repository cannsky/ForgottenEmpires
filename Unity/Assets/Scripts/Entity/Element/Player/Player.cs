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

        //private float health, totalHealth;

        private void Start()
        {
            playerWorker = new PlayerWorker(this);
            playerData = new PlayerData();
            isActive = isEnabled = true;
            playerWorker.OnStart();
        }

        private void Update() => playerWorker.OnUpdate();

        private void FixedUpdate() => playerWorker.OnFixedUpdate();

        private void LateUpdate() => playerWorker.OnLateUpdate();

        public override void Regenerate() => playerWorker.playerStats.Regenerate();

        public override void TakeDamage(float damage) => playerWorker.playerStats.TakeDamage(damage);

        public override void SetAnimation(AnimationType animationType, bool value) => playerWorker.playerAnimation.SetAnimation(animationType, value);

        //Client Requests

        [Command] public void CmdPlayerAttackRequest() => playerWorker.playerAttack.Attack();

        [Command] public void CmdPlayerMovementRequest(Vector2 position) => playerWorker.playerMovement.SetMovementPosition(position);

        [Command] public void CmdPlayerRotationRequest(Vector3 rotation) => playerWorker.playerRotation.SetTargetRotation(rotation);
    }
}