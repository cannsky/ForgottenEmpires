using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ForgottenEmpires.Managers.Data.Workers
{
    public class PlayerDataWorker
    {
        public PlayerGetDataWorker playerGetDataWorker;
        public PlayerOnChainDataWorker playerOnChainDataWorker;
        public PlayerOffChainDataWorker playerOffChainDataWorker;

        public PlayerDataManager()
        {
            playerGetDataWorker = new PlayerGetDataWorker();
            playerOnChainDataWorker= new PlayerOnChainDataWorker();
            playerOffChainDataWorker = new PlayerOffChainDataWorker();
        }

        public static void OnStart(){
            playerGetDataWorker.OnStart();
            playerOnChainDataWorker.OnStart();
            playerOffChainDataWorker.OnStart();
        }
    }
}