using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ForgottenEmpires.Managers.Data.Workers
{
    public class PlayerDataWorker
    {
        public PlayerOnChainDataWorker playerOnChainDataWorker;
        public PlayerOffChainDataWorker playerOffChainDataWorker;

        public PlayerDataManager()
        {
            playerOnChainDataWorker= new PlayerOnChainDataWorker();
            playerOffChainDataWorker = new PlayerOffChainDataWorker();
        }

        public static void OnStart(){
            playerOnChainDataWorker.OnStart();
            playerOffChainDataWorker.OnStart();
        }
    }
}