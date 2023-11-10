using System.Runtime.InteropServices;

namespace ForgottenEmpires.Managers.JS
{
    public class JSConnector
    {
        public static JSConnector Instance;

        [DllImport("__Internal")]
        private static extern void BuyPotion(string callbackObjectName, string callbackMethodName);

        [DllImport("__Internal")]
        private static extern void UsePotion(string callbackObjectName, string callbackMethodName);

        [DllImport("__Internal")]
        private static extern void ConnectWallet(string callbackObjectName, string callbackMethodName);

        [DllImport("__Internal")]
        private static extern void DebugMessage(string callbackObjectName, string callbackMethodName);

        public void BuyPotion()
        {

        }

        public void ReturnMessage(string message)
        {
            string[] keyValue = message.Split(':');

            if (keyValue.Length != 2) return;
            string category = keyValue[0].Trim();
            int value = int.Parse(keyValue[1].Trim());

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

        private void ProcessWallet(int value)
        {

        }

        private void ProcessPotionUse(int value)
        {

        }

        private void ProcessPotionBuy(int value)
        {

        }
    }
}
