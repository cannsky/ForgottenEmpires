using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ForgottenEmpires.Entities.Elements.PlayerDatas;
using System;

namespace ForgottenEmpires.Managers.Data.Components
{
    public class DataManagerPostRequest
    {
        // GraphQL server URL
        private string serverURL = "http://localhost:8080/graphql";

        public IEnumerator SendQuery(string query, PlayerData playerData, Action<PlayerData, string> callback) {
            // Create json data with the query
            string jsonData = "{\"query\": \"" + query.Replace("\"", "\\\"").Replace("\n", "").Replace("\r", "") + "\"}";
            // Create UnityWebRequest object
            UnityWebRequest request = new UnityWebRequest(serverURL, "POST");
            byte[] bodyRaw = System.Text.Encoding.UTF8.GetBytes(jsonData);
            request.uploadHandler = new UploadHandlerRaw(bodyRaw);
            request.downloadHandler = new DownloadHandlerBuffer();
            request.SetRequestHeader("Content-type", "application/json");
            // Send request
            yield return request.SendWebRequest();
            if (request.result != UnityWebRequest.Result.Success) Debug.LogError("Error sending request: " + request.error);
            else {
                // Parse response
                string jsonResponse = request.downloadHandler.text;
                callback(playerData, jsonResponse);
            }
        }
    }
}