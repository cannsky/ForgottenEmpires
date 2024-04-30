using System.Collections;
using System.Collections.Generic;
using ForgottenEmpires.Managers.Data.Components;
using ForgottenEmpires.Managers.Data;
using UnityEngine;
using Newtonsoft.Json;

namespace ForgottenEmpires.Managers.Data.Workers
{
    public class PlayerDataManagerWorker
    {
        private DataManagerPostRequest playerDataManagerPostRequest;

        public PlayerDataManagerWorker() => playerDataManagerPostRequest = new DataManagerPostRequest();

        public void UpdatePlayerData(PlayerData playerData, string walletAddress) {
            // Define Query
            string query = @"
                query MyQuery {
                    runtime {
                        Player {
                            players(key: """ + walletAddress + @""") {
                                level {
                                    value
                                }
                                xp {
                                    value
                                }
                            }
                        }
                    }
                }
            ";
            // Send Query
            DataManager.Instance.StartCoroutine(playerDataManagerPostRequest.SendQuery(query, playerData, UpdatePlayerDataCallback));
        }

        public void UpdatePlayerDataCallback(PlayerData playerData, string response) {
            // Convert json object to object
            PlayerPostRequestResponse.PlayerResponse playerResponse = JsonConvert.DeserializeObject<PlayerPostRequestResponse.Playerresponse>(response);
            // Get player data
            PlayerPostRequestResponse.Player playerOnChainData = playerResponse.data.runtime.players;
            // Update player data
            playerData.playerOnChainData.UpdatePlayerData(
                uint.Parse(playerOnChainData.level.value),
                uint.Parse(playerOnChainData.xp.value)
            );
            // Set texts to the values
            GameObject.Find("Level Text").GetComponent<TMP_Text>().text = "Level: " + playerOnChainData.level.value;
            GameObject.Find("XP Text").GetComponent<TMP_Text>().text = "XP: " + playerOnChainData.xp.value;
        }
    }
}