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
        private static extern void JSCreateGuild(string callbackObjectName, string callbackMethodName);

        [DllImport("__Internal")]
        private static extern void JSJoinGuild(string callbackObjectName, string callbackMethodName, int guildID);

        [DllImport("__Internal")]
        private static extern void JSLeaveGuild(string callbackObjectName, string callbackMethodName, int guildID);

        [DllImport("__Internal")]
        private static extern void JSNewItem(string callbackObjectName, string callbackMethodName);

        [DllImport("__Internal")]
        private static extern void JSUpgradeItemDamage(string callbackObjectName, string callbackMethodName, int itemID);

        [DllImport("__Internal")]
        private static extern void JSUpgradeItemDefense(string callbackObjectName, string callbackMethodName, int itemID);

        [DllImport("__Internal")]
        private static extern void JSGetTotalItemDamage(string callbackObjectName, string callbackMethodName, int itemID);

        [DllImport("__Internal")]
        private static extern void JsGetTotalItemDefense(string callbackObjectName, string callbackMethodName, int itemID);

        [DllImport("__Internal")]
        public static extern void DebugMessage(string message);

        private void Awake() => DontDestroyOnLoad(Instance = this);

        // Called when player creates the guild
        public void CreateGuild() => JSCreateGuild(gameObject.name, "ReturnMessage");

        // Called when player joins to a guild
        public void JoinGuild(int guildID) => JSJoinGuild(gameObject.name, "ReturnMessage", guildID);

        // Called when player leaves the guild
        public void LeaveGuild(int guildID) => JSLeaveGuild(gameObject.name, "ReturnMessage", guildID);

        // Called when player creates a new item
        public void NewItem() => JSNewItem(gameObject.name, "ReturnMessage");

        // Called when player wants to upgrade item damage
        public void UpgradeItemDamage(int itemID) => JSUpgradeItemDamage(gameObject.name, "ReturnMessage", itemID);

        // Called when player wants to upgrade item defense
        public void UpgradeItemDefense(int itemID) => JSUpgradeItemDefense(gameObject.name, "ReturnMessage", itemID);

        // Called when item total damage on chain data is being requested
        public void GetTotalItemDamage(int itemID) => JSGetTotalItemDamage(gameObject.name, "ReturnMessage", itemID);

        // Called when item total defense on chain data is being requested
        public void GetTotalItemDefense(int itemID) => JSGetTotalItemDefense(gameObject.name, "ReturnMessage", itemID);

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
