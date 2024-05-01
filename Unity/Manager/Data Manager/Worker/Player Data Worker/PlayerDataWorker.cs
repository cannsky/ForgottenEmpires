using System.Collections;
using System.Collections.Generic;
using ForgottenEmpires.Managers.Data.Components;
using ForgottenEmpires.Managers.Data;
using UnityEngine;
using Newtonsoft.Json;

namespace ForgottenEmpires.Managers.Data.Workers
{
    public class PlayerDataWorker
    {
        private DataManagerPostRequest playerDataWorkerPostRequest;

        public PlayerDataWorker() => playerDataWorkerPostRequest = new DataManagerPostRequest();

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
            DataManager.Instance.StartCoroutine(playerDataWorkerPostRequest.SendQuery(query, playerData, UpdatePlayerDataCallback));
        }

        public void UpdatePlayerDataCallback(PlayerData playerData, string response) {
            // Convert json object to object
            PlayerPostRequestResponse.PlayerResponse playerResponse = JsonConvert.DeserializeObject<PlayerPostRequestResponse.PlayerResponse>(response);
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

        public void UpdatePlayerStatsData(PlayerData playerData, string walletAddress) {
            // Define Query
            string query = @"
                query MyQuery {
                    runtime {
                        Player {
                            playerStats(key: """ + walletAddress + @""") {
                                bravery {
                                    value
                                }
                                charisma {
                                    value
                                }
                                leadership {
                                    value
                                }
                                maxupgrade {
                                    value
                                }
                                reputation {
                                    value
                                }
                            }
                        }
                    }
                }
            ";
            // Send Query
            DataManager.Instance.StartCoroutine(playerDataWorkerPostRequest.SendQuery(query, playerData, UpdatePlayerStatsDataCallback));
        }

        public void UpdatePlayerStatsDataCallback(PlayerData playerData, string response) {
            // Convert json object to object
            PlayerPostRequestResponse.PlayerResponse playerStatsResponse = JsonConvert.DeserializeObject<PlayerPostRequestResponse.PlayerStatsResponse>(response);
            // Get player stats data
            PlayerPostRequestResponse.PlayerStats playerOnChainData = playerStatsResponse.data.runtime.players;
            // Update player stats data
            playerData.playerOnChainData.UpdatePlayerStatsData(
                uint.Parse(playerOnChainData.bravery.value),
                uint.Parse(playerOnChainData.charisma.value),
                uint.Parse(playerOnChainData.leadership.value),
                uint.Parse(playerOnChainData.maxupgrade.value),
                uint.Parse(playerOnChainData.reputation.value),
            );
            // Set texts to the values
            GameObject.Find("Bravery Text").GetComponent<TMP_Text>().text = "Bravery Text: " + playerOnChainData.bravery.value;
            GameObject.Find("Charisma Text").GetComponent<TMP_Text>().text = "Charisma Text: " + playerOnChainData.xp.value;
            GameObject.Find("Leadership Text").GetComponent<TMP_Text>().text = "Leadership Text: " + playerOnChainData.leadership.value;
            GameObject.Find("Max Upgrade Text").GetComponent<TMP_Text>().text = "Max Upgrade Text: " + playerOnChainData.maxupgrade.value;
            GameObject.Find("Reputation Text").GetComponent<TMP_Text>().text = "Reputation Text: " + playerOnChainData.reputation.value;
        }
    }
}