using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ForgottenEmpires.Entities.Elements.PlayerDatas;

namespace ForgottenEmpires.Managers.Data.Workers
{
    public class ItemOnChainDataWorker
    {
        // All items' data will be stored from this list
        private List<ItemOnChainData> allItemsData = new List<ItemOnChainData>();

        public ItemOnChainDataWorker() => DataManager.StartCoroutine(UpdateAllItemsData());

        // Save item data to the items data list
        public void RegisterPlayer(ItemOnChainData itemOnChainData)
        {
            allItemsData.Add(itemOnChainData);
            DataManager.StartCoroutine(UpdateAllItemsData());
        }

        // Update item's data in interval
        private IEnumerator UpdateAllItemsData()
        {
            while (true)
            {
                // Update each item's data in 1 seconds for optimization
                foreach (var playerOnChainData in allPlayersData) playerOnChainData.UpdatePlayerData();
                yield return new WaitForSeconds(1f);
            }
        }

        private void OnStart()
        {
            StartCoroutine(UpdateAllItemsData());
        }
    }
}