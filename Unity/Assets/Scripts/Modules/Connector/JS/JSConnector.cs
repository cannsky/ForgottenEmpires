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

        private void Awake()
        {
            Instance = this;
        }

        public void OnClick()
        {
            CW(gameObject.name, "ReturnMessage");
        }

        public void BuyPotion()
        {
            BP(gameObject.name, "ReturnMessage");
        }

        public void ReturnMessage(string message)
        {
            DebugMessage(message);

            string[] keyValue = message.Split(':');

            if (keyValue.Length != 2) return;
            string category = keyValue[0].Trim();
            string value = keyValue[1].Trim();

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

        private void ProcessWallet(string value)
        {
            if (value == "0" || value == "1") return;
            NetworkManager.singleton.StartClient();
            ClientManager.Instance.clientManagerWorker.clientDataWorker.walletAddress = value;
            GameObject.Find("Enter Canvas").SetActive(false);
        }

        private void ProcessPotionUse(string value)
        {
            GameObject.Find("Merchant Canvas").SetActive(false);
        }

        private void ProcessPotionBuy(string value)
        {

        }
    }
}
