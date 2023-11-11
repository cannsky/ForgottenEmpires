using UnityEngine;
using ForgottenEmpires.Entities.Elements.PlayerWorkers;
using ForgottenEmpires.Entities.Elements.PlayerDatas;
using Mirror;
using ForgottenEmpires.Types;
using ForgottenEmpires.Managers.Server;
using ForgottenEmpires.Managers.Client;
using TMPro;

namespace ForgottenEmpires.Entities.Elements
{
    public class Player : Element
    {
        public PlayerWorker playerWorker;
        public PlayerData playerData;

        public static Player local;

        public TMP_Text healthText;

        [SyncVar] public int potionCount = 0;

        public string walletAddress;

        private void Start()
        {
            playerWorker = new PlayerWorker(this);
            playerData = new PlayerData(this);
            isActive = isEnabled = true;
            playerWorker.OnStart();
            ServerManager.Instance.serverManagerWorker.serverPlayerWorker.AddPlayer(this);
            healthText = GameObject.Find("Health Potion Text").GetComponent<TMP_Text>();
            if (isLocalPlayer) local = this;
            //if (isLocalPlayer) CmdUpdateWalletAddress(ClientManager.Instance.clientManagerWorker.clientDataWorker.walletAddress);
        }

        private void Update() => playerWorker.OnUpdate();

        private void FixedUpdate() => playerWorker.OnFixedUpdate();

        private void LateUpdate() => playerWorker.OnLateUpdate();

        public override void Regenerate() => playerWorker.playerStats.Regenerate();

        public override void TakeDamage(float damage) => playerWorker.playerStats.TakeDamage(damage);

        public override void SetAnimation(AnimationType animationType, bool value) => playerWorker.playerAnimation.SetAnimation(animationType, value);

        //Client Requests

        [Command] public void CmdPlayerUpdateWalletAddressRequest(string walletAddress) => this.walletAddress = walletAddress;

        [Command] public void CmdPlayerAttackRequest() => playerWorker.playerAttack.Attack();

        [Command] public void CmdPlayerMovementRequest(Vector2 position) => playerWorker.playerMovement.SetMovementPosition(position);

        [Command] public void CmdPlayerRotationRequest(Vector3 rotation) => playerWorker.playerRotation.SetTargetRotation(rotation);

        [Command]
        public void CmdPlayerHealthRequest()
        {
            if (potionCount <= 0) return;
            transform.GetChild(1).GetChild(0).gameObject.SetActive(true);
            potionCount--;
        }

        [Command] public void CmdUpdateWalletAddress(string walletAddress)
        {
            return;
            this.walletAddress = walletAddress;
        }
    }
}