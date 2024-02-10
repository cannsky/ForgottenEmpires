using Newtonsoft.Json;
using ForgottenEmpires.Managers.Data.Components;
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
        private PlayerMerkleTree playerMerkleTree;

        public static DataManager Instance;

        public DataManagerWorker dataManagerWorker;

        private string url = "http://localhost:4321/";

        private void Awake() => DontDestroyOnLoad(Instance = this);

        private void Start()
        {
            if (NetworkManager.singleton.isNetworkActive && NetworkServer.active) StartGettingData();
        }

        public void StartGettingData()
        {
            // Start updating the MerkleTree
            ServerManager.Instance.StartCoroutine(UpdateMerkleTree());

            // Initialize the MerkleTree
            playerMerkleTree = new PlayerMerkleTree();

            // Create a new player data manager
            dataManagerWorker = new DataManagerWorker();

            // Start PlayerDataManager
            dataManagerWorker.OnStart();
        }

        // Coroutine to continuously update the MerkleTree
        public IEnumerator UpdateMerkleTree()
        {
            while (true)
            {
                // Send a POST request to update data
                yield return SendPostRequest();
                yield return new WaitForSeconds(20f);
            }
        }

        // Coroutine to send a POST request to the specified URL
        public IEnumerator SendPostRequest()
        {
            Debug.Log("Data is being updated...");

            // Create a UnityWebRequest object for sending the POST request
            UnityWebRequest webRequest = new UnityWebRequest(url, UnityWebRequest.kHttpVerbPOST)
            {
                downloadHandler = new DownloadHandlerBuffer(),
                uploadHandler = new UploadHandlerRaw(new byte[0])
            };
            webRequest.SetRequestHeader("Content-Type", "application/json");

            // Send the POST request and wait for the response
            yield return webRequest.SendWebRequest();
            if (webRequest.result != UnityWebRequest.Result.Success)
            {
                Debug.LogError("Error: " + webRequest.error);
            }
            else
            {
                // Parse the JSON response and update the MerkleTree with the received data
                string jsonResult = webRequest.downloadHandler.text;
                List<PlayerMerkleTree> nodes = JsonConvert.DeserializeObject<List<PlayerMerkleTreeNode>>(jsonResult);
                playerMerkleTree.UpdateNodes(nodes);
                Debug.Log(webRequest.downloadHandler.text);
            }

            // Dispose of the UnityWebRequest object
            webRequest.Dispose();
        }

        // Get player data based on player's wallet address from the MerkleTree
        public PlayerMerkleTreeNode GetPlayerData(string walletAddress)
        {
            if (playerMerkleTree == null || playerMerkleTree.nodes == null) return null;
            return playerMerkleTree.nodes.FirstOrDefault(playerData => playerData.publicKey == walletAddress);
        }
    }
}