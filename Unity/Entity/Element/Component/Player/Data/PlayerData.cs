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

        // Update the player's data by data of DataManager.
        public void UpdatePlayerData()
        {
            // Check if the player or wallet address is null
            if (player == null || player.walletAddress == null) return;

            // Retrieve the player's data from the DataManager.
            MerkleTreeNode node = DataManager.Instance.GetPlayerData(player.walletAddress);

            // Update the player's potion count if data was found.
            if (node != null) player.playerWorker.playerStats.playerOnChainStats.UpdateOnChainData(node.potionCount);
        }

        public void OnStart()
        {
            // Start a coroutine to continously retrieve player data.
            player.StartCoroutine(GetPlayerData());
        }

        public IEnumerator GetPlayerData()
        {
            yield return new WaitForSeconds(10f);

            // Update the player's data.
            UpdatePlayerData();

            // Start a coroutine to continously retrieve player data.
            player.StartCoroutine(GetPlayerData());
        }
    }
}