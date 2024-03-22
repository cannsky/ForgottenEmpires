using ForgottenEmpires.Managers.Data;
using ForgottenEmpires.Components.MerkleTrees;
using System.Collections;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerDatas
{
    public class PlayerOnChainData
    {
        private PlayerData playerData;

        public string walletAddress;

        public uint level, xp;

        public uint charisma, reputation, maxUpgrade, leadership, bravery;

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
            PlayerMapNode playerNode = DataManager.Instance.GetPlayerData(playerData.player.walletAddress);
            // Update the player's xp, level and kingdom from onchain data
            if (playerNode == null) return;
            // Update player level
            level = playerNode.level;
            // Update player xp
            xp = playerNode.xp;
            // Update player charisma
            charisma = playerNode.charisma;
            // Update player reputation
            reputation = playerNode.reputation;
            // Update player max upgrade
            maxUpgrade = playerNode.maxUpgrade;
            // Update player leadership
            leadership = playerNode.leadership;
            // Update player bravery
            bravery = playerNode.bravery;
        }
    }
}