using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ForgottenEmpires.Entities.Elements.PlayerDatas;

namespace ForgottenEmpires.Managers.Data.Workers
{
    public class PlayerGetDataWorker
    {
        // Player on chain data url
        private string url = "http://localhost:4321/player";

        // Player map to store player on chain data
        public PlayerMap playerMap;

        public PlayerGetDataWorker() => DataManager.StartCoroutine(UpdateAllPlayersData());

        public void OnStart() => StartGettingPlayerData();

        public void StartGettingPlayerData()
        {
            // Start updating the player map
            ServerManager.Instance.StartCoroutine(UpdatePlayerMap());

            // Initialize the player map
            playerMap = new PlayerMap();

            // Create a new player data manager
            dataManagerWorker = new DataManagerWorker();

            // Start PlayerDataManager
            dataManagerWorker.OnStart();
        }

        // Coroutine to continuously update the map
        public IEnumerator UpdatePlayerMap()
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
            // Create a UnityWebRequest object for sending the POST request
            UnityWebRequest webRequest = new UnityWebRequest(url, UnityWebRequest.kHttpVerbPOST)
            {
                downloadHandler = new DownloadHandlerBuffer(),
                uploadHandler = new UploadHandlerRaw(new byte[0])
            };
            
            webRequest.SetRequestHeader("Content-Type", "application/json");

            // Send the POST request and wait for the response
            yield return webRequest.SendWebRequest();
            if (webRequest.result != UnityWebRequest.Result.Success) Debug.LogError("Error: " + webRequest.error);
            else
            {
                // Parse the JSON response and update the MerkleTree with the received data
                string jsonResult = webRequest.downloadHandler.text;
                List<PlayerMapNode> nodes = JsonConvert.DeserializeObject<List<PlayerMapNode>>(jsonResult);
                playerMap.UpdateNodes(nodes);
                Debug.Log(webRequest.downloadHandler.text);
            }

            // Dispose of the UnityWebRequest object
            webRequest.Dispose();
        }

        // Get player data based on player's wallet address from the MerkleTree
        public PlayerMapNode GetPlayerData(string walletAddress)
        {
            if (playerMap == null || playerMap.playerNodes == null) return null;
            return playerMap.playerNodes.FirstOrDefault(playerData => playerData.publicKey == walletAddress);
        }
    }
}