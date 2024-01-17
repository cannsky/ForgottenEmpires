using ForgottenEmpires.Managers.Data;
using ForgottenEmpires.Managers.Data.Components;
using System.Collections;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerDatas
{
    public class PlayerData
    {
        private Player player;

        public PlayerOnChainData playerOnChainData;
        public PlayerOffChainData playerOffChainData;

        public PlayerData(Player player)
        {
            this.player = player;

            playerOnChainData = new PlayerOnChainData(this);
            playerOffChainData = new PlayerOffChainData(this);
        }

        public void OnStart()
        {
            // Start a coroutine to continously retrieve player data.
            DataManager.Instance.playerDataManager.playerOnChainDataManager.RegisterPlayer(playerOnChainData);
        }
    }
}