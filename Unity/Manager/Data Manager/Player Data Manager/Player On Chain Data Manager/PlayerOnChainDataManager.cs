using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ForgottenEmpires.Managers.Data
{
    public class PlayerOnChainDataManager
    {
        // All player's data will be stored from this list
        private List<PlayerOnChainData> allPlayersData = new List<PlayerOnChainData>();

        private PlayerDataManager playerDataManager;

        public PlayerDataManager(PlayerDataManager playerDataManager)
        {
            this.playerDataManager = playerDataManager;
            DataManager.StartCoroutine(UpdateAllPlayersData());
        }

        // Save player data to the player data list
        public void RegisterPlayer(PlayerOnChainData playerOnChainData)
        {
            allPlayersData.Add(playerOnChainData);
            DataManager.StartCoroutine(UpdateAllPlayersData());
        }

        // Update player's data in interval
        private IEnumerator UpdateAllPlayersData()
        {
            while (true)
            {
                // Update each player's data in 1 seconds for optimization
                foreach (var playerOnChainData in allPlayersData) playerOnChainData.UpdatePlayerData();
                yield return new WaitForSeconds(1f);
            }
        }

        private void OnStart()
        {
            StartCoroutine(UpdateAllPlayersData());
        }
    }
}