using ForgottenEmpires.Managers.Data;
using ForgottenEmpires.Managers.Data.Components;
using System.Collections;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerDatas
{
    public class PlayerData
    {
        private Player player;

        public PlayerData(Player player)
        {
            this.player = player;
        }

        public void UpdatePlayerData()
        {
            return;
            if (player == null || player.walletAddress == null) return;
            MerkleTreeNode node = DataManager.Instance.GetPlayerData(player.walletAddress);
            if (node != null) player.potionCount = node.potionCount;
        }

        public void OnStart()
        {
            return;
            player.StartCoroutine(GetPlayerData());
        }

        public IEnumerator GetPlayerData()
        {
            yield return new WaitForSeconds(10f);
            UpdatePlayerData();
            player.StartCoroutine(GetPlayerData());
        }
    }
}