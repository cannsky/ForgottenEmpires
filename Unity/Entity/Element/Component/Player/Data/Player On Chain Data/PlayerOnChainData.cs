using ForgottenEmpires.Managers.Data;
using ForgottenEmpires.Managers.Data.Components;
using System.Collections;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerDatas
{
    public class PlayerOnChainData
    {
        private PlayerData playerData;

        public PlayerOnChainData(PlayerData playerData)
        {
            this.playerData = playerData;
        }

        // Update the player's data by data of DataManager.
        public void UpdatePlayerData()
        {
            // Check if the player or wallet address is null
            if (playerData.player == null || playerData.player.walletAddress == null) return;

            // Retrieve the player's data from the DataManager.
            MerkleTreeNode node = DataManager.Instance.GetPlayerData(playerData.player.walletAddress);

            // Update the player's xp, level and kingdom from onchain data
            if (node != null) playerData.player.playerWorker.playerStats.playerOnChainStats.UpdateOnChainData(node.xp, node.level, node.kingdom);
        }
    }
}