using ForgottenEmpires.Managers.Data;
using System.Collections;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerDatas
{
    public class PlayerData
    {
        private Player player;

        public float potionCount;

        public void UpdatePlayerData() => potionCount = DataManager.Instance.GetPlayerData(player.walletAddress).potionCount;

        public void OnStart() => player.StartCoroutine(GetPlayerData());

        public IEnumerator GetPlayerData()
        {
            yield return new WaitForSeconds(10f);
            UpdatePlayerData();
            player.StartCoroutine(GetPlayerData());
        }
    }
}