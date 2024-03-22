using Newtonsoft.Json;
using ForgottenEmpires.Components.MerkleTrees;
using ForgottenEmpires.Managers.Server;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using System.Linq;
using Mirror;

namespace ForgottenEmpires.Managers.Data
{
    public class DataManager : MonoBehaviour
    {
        public static DataManager Instance;

        public DataManagerWorker dataManagerWorker;

        private void Awake() => DontDestroyOnLoad(Instance = this);

        private void Start()
        {
            if (!NetworkManager.singleton.isNetworkActive || !NetworkServer.active) return;
            // Create a new player data manager
            dataManagerWorker = new DataManagerWorker();
            // Start PlayerDataManager
            dataManagerWorker.OnStart();
        }
    }
}