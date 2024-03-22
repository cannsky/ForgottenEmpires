using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ForgottenEmpires.Managers.Data.Workers
{
    public class ItemDataWorker
    {
        public ItemOnChainDataWorker playerOnChainDataWorker;

        public ItemDataManager()
        {
            playerOnChainDataWorker= new PlayerOnChainDataWorker();
        }

        public static void OnStart(){
            playerOnChainDataWorker.OnStart();
        }
    }
}