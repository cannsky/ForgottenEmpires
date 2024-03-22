using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ForgottenEmpires.Entities.Elements.PlayerDatas;

namespace ForgottenEmpires.Managers.Data.Workers
{
    public class PlayerGetDataWorker
    {
        // Player on chain data url
        private string playerNodesURL = "http://localhost:4321/player/nodes";

        // Player stats on chain data url
        private string playerStatsNodesURL = "http://localhost:4321/player/statsnodes";

        // Player map to store player on chain data
        public PlayerMap playerMap;

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
            List<PlayerMapNode> playerNodes;
            List<PlayerStatsNode> playerStatsNodes;

            // Create a UnityWebRequest object for sending the POST request
            UnityWebRequest webRequest = new UnityWebRequest(playerNodesURL, UnityWebRequest.kHttpVerbPOST)
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
                string playerNodesJsonResult = webRequest.downloadHandler.text;
                playerNodes = JsonConvert.DeserializeObject<List<PlayerMapNode>>(playerNodesJsonResult);
            }

            // Create a UnityWebRequest object for sending the POST request
            UnityWebRequest webRequest = new UnityWebRequest(playerStatsNodesURL, UnityWebRequest.kHttpVerbPOST)
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
                string playerStatsNodesJsonResult = webRequest.downloadHandler.text;
                playerStatsNodes = JsonConvert.DeserializeObject<List<PlayerStatsNode>>(playerStatsNodesJsonResult);
            }

            // Update player nodes
            playerMap.UpdateNodes(playerNodes, playerStatsNodes);

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