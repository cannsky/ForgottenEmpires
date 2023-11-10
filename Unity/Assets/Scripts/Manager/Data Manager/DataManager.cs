using ForgottenEmpires.Managers.Data.Components;
using ForgottenEmpires.Managers.Server;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.Networking;

namespace ForgottenEmpires.Managers.Data
{
    public class DataManager : MonoBehaviour
    {
        private MerkleTree merkleTree;

        public static DataManager Instance;

        private string url = "https://forgottenempires.network/"; //Update here with your domain name.

        private void Awake()
        {
            Instance = this;
        }

        private void Start() => ServerManager.Instance.StartCoroutine(UpdateMerkleTree());

        public IEnumerator UpdateMerkleTree()
        {
            yield return new WaitForSeconds(5f);
            yield return ServerManager.Instance.StartCoroutine(SendPostRequest());
            UpdateMerkleTree();
        }

        public IEnumerator SendPostRequest()
        {
            using (UnityWebRequest webRequest = new UnityWebRequest(url))
            {
                webRequest.downloadHandler = new DownloadHandlerBuffer();

                yield return webRequest.SendWebRequest();

                if (webRequest.result != UnityWebRequest.Result.Success) Debug.LogError("Error: " + webRequest.error);
                else
                {
                    string jsonResult = webRequest.downloadHandler.text;
                    merkleTree = JsonUtility.FromJson<MerkleTree>("{\"items\":" + jsonResult + "}");
                }
            }
        }

        public MerkleTreeNode GetPlayerData(string walletAddress) => merkleTree.nodes.FirstOrDefault(playerData => playerData.walletAddress == walletAddress);
    }
}