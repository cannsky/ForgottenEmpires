using Newtonsoft.Json;
using ForgottenEmpires.Managers.Data.Components;
using ForgottenEmpires.Managers.Server;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using System.Linq;

namespace ForgottenEmpires.Managers.Data
{
    public class DataManager : MonoBehaviour
    {
        public bool isServer;

        private MerkleTree merkleTree;

        public static DataManager Instance;

        private string url = "http://localhost:4321/";

        private void Awake()
        {
            Instance = this;
        }

        private void Start()
        {
            Debug.Log("IsServer: " + isServer);
            if (isServer) ServerManager.Instance.StartCoroutine(UpdateMerkleTree());
            merkleTree = new MerkleTree();
        }

        public IEnumerator UpdateMerkleTree()
        {
            while (true)
            {
                yield return SendPostRequest();
                yield return new WaitForSeconds(20f);
            }
        }

        public IEnumerator SendPostRequest()
        {
            Debug.Log("Data is being updated...");
            UnityWebRequest webRequest = new UnityWebRequest(url, UnityWebRequest.kHttpVerbPOST)
            {
                downloadHandler = new DownloadHandlerBuffer(),
                uploadHandler = new UploadHandlerRaw(new byte[0])
            };
            webRequest.SetRequestHeader("Content-Type", "application/json");

            yield return webRequest.SendWebRequest();

            if (webRequest.result != UnityWebRequest.Result.Success)
            {
                Debug.LogError("Error: " + webRequest.error);
            }
            else
            {
                string jsonResult = webRequest.downloadHandler.text;
                List<MerkleTreeNode> nodes = JsonConvert.DeserializeObject<List<MerkleTreeNode>>(jsonResult);
                merkleTree.UpdateNodes(nodes);
                Debug.Log(webRequest.downloadHandler.text);
            }

            webRequest.Dispose();
        }

        public MerkleTreeNode GetPlayerData(string walletAddress)
        {
            if (merkleTree == null || merkleTree.nodes == null)
            {
                //Debug.Log("Merkle tree or nodes are null");
                return null;
            }
            return merkleTree.nodes.FirstOrDefault(playerData => playerData.publicKey == walletAddress);
        }
    }
}