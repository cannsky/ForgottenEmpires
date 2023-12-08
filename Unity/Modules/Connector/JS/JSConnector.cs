using ForgottenEmpires.Managers.Client;
using Mirror;
using System.Runtime.InteropServices;
using UnityEngine;

namespace ForgottenEmpires.Managers.JS
{
    public class JSConnector : MonoBehaviour
    {
        public static JSConnector Instance;

        [DllImport("__Internal")]
        private static extern void BP(string callbackObjectName, string callbackMethodName);

        [DllImport("__Internal")]
        private static extern void UP(string callbackObjectName, string callbackMethodName);

        [DllImport("__Internal")]
        private static extern void CW(string callbackObjectName, string callbackMethodName);

        [DllImport("__Internal")]
        public static extern void DebugMessage(string message);

        private void Awake() => DontDestroyOnLoad(Instance = this);

        // Called when a button is clicked
        public void ConnectWallet() => CW(gameObject.name, "ReturnMessage");

        // Called when a button is clicked
        public void BuyPotion()
        {
            BP(gameObject.name, "ReturnMessage");
        }

        // Called when a message is returned from JavaScript
        public void ReturnMessage(string message)
        {
            // Log the received message to the JavaScript console
            DebugMessage(message);

            // Split the message into category and value
            string[] keyValue = message.Split(':');

            // Check if the message has the expected format
            if (keyValue.Length != 2) return;
            string category = keyValue[0].Trim();
            string value = keyValue[1].Trim();

            // Process the message based on its category
            switch (category)
            {
                case "wallet":
                    ProcessWallet(value);
                    break;
                case "potionUse":
                    ProcessPotionUse(value);
                    break;
                case "potionBuy":
                    ProcessPotionBuy(value);
                    break;
                default:
                    break;
            }
        }

        // Process wallet information
        private void ProcessWallet(string value)
        {
            // Check if the value is "0" or "1"; if so, return
            if (value == "0" || value == "1") return;

            // Set the wallet address in the client data worker
            ClientManager.Instance.clientManagerWorker.clientDataWorker.walletAddress = value;

            ClientManager.Instance.clientManagerWorker.clientUIWorker.ChangeWelcomeScreen();
        }

        // Process potion use information
        private void ProcessPotionUse(string value)
        {
            GameObject.Find("Merchant Canvas").SetActive(false);
        }

        // Process potion buy information
        private void ProcessPotionBuy(string value)
        {

        }
    }
}
