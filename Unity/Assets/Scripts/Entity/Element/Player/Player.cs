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

        // Text component for displaying player health.
        public TMP_Text healthText;

        // Synchronized variable for the player's potion count.
        [SyncVar] public int potionCount = 0;

        // The wallet address associated with the player.
        public string walletAddress;

        private void Start()
        {
            // Initialize the player worker and player data components.
            playerWorker = new PlayerWorker(this);
            playerData = new PlayerData(this);

            // Set the player as active and enabled.
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

        // Override method for regenerating the player.
        public override void Regenerate() => playerWorker.playerStats.Regenerate();

        // Override method for handling when the player takes damage.
        public override void TakeDamage(float damage) => playerWorker.playerStats.TakeDamage(damage);

        // Override method for setting player animations.
        public override void SetAnimation(AnimationType animationType, bool value) => playerWorker.playerAnimation.SetAnimation(animationType, value);

        //Client Requests

        // Command to request updating the player's wallet address.
        [Command] public void CmdPlayerUpdateWalletAddressRequest(string walletAddress) => this.walletAddress = walletAddress;

        // Command to request player attack.
        [Command] public void CmdPlayerAttackRequest() => playerWorker.playerAttack.Attack();

        // Command to request player movement.
        [Command] public void CmdPlayerMovementRequest(Vector2 position) => playerWorker.playerMovement.SetMovementPosition(position);

        // Command to request player rotation.
        [Command] public void CmdPlayerRotationRequest(Vector3 rotation) => playerWorker.playerRotation.SetTargetRotation(rotation);

        // Command to request player health update.
        [Command]
        public void CmdPlayerHealthRequest()
        {
            if (potionCount <= 0) return;
            transform.GetChild(1).GetChild(0).gameObject.SetActive(true);
            potionCount--;
        }

        [Command] public void CmdUpdateWalletAddress(string walletAddress)
        {
            this.walletAddress = walletAddress;
        }
    }
}