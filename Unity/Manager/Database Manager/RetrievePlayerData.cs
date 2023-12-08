using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using ForgottenEmpires.Entity.Elements.PlayerDatas;

//TODO: add a new namespace 

[System.Serializable]
public class PlayerData
{
    public string walletaddress;
    public string playerUID;
}

public class RetrievePlayerData
{
    private const string Url = "http://example.com/";

    public IEnumerator SendRequest(string userData, System.Action<PlayerData> onSuccess)
    {
        WWWForm form = new WWWForm();
        form.AddField("user", userData);

        using (UnityWebRequest webRequest = UnityWebRequest.Post(Url, form))
        {
            // Request and wait for the desired page.
            yield return webRequest.SendWebRequest();

            if (webRequest.result != UnityWebRequest.Result.Success)
            {
                Debug.Log("Error: " + webRequest.error);
            }
            else
            {
                try
                {
                    PlayerData playerData = JsonUtility.FromJson<PlayerData>(webRequest.downloadHandler.text);
                    onSuccess?.Invoke(playerData);
                }
                catch (System.Exception e)
                {
                    Debug.LogError("Error parsing JSON: " + e.Message);
                }
            }
        }
    }
}