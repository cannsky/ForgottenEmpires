using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ForgottenEmpires.Managers.Data
{
    public class PlayerDataManager
    {
        public PlayerOnChainDataManager playerOnChainDataManager;
        public PlayerOffChainDataManager playerOffChainDataManager;

        public PlayerDataManager()
        {
            playerOnChainDataManager = new PlayerOnChainDataManager(this);
            playerOffChainDataManager = new PlayerOffChainDataManager();
        }

        public void OnStart(){
            playerOnChainDataManager.OnStart();
            playerOffChainDataManager.OnStart();
        }
    }
}