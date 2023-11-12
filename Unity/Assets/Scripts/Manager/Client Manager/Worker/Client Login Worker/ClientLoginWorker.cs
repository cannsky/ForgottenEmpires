using ForgottenEmpires.Managers.JS;

namespace ForgottenEmpires.Managers.Client.Workers
{
    public class ClientLoginWorker
    {
        // Call connect wallet when user clicks to the button
        public void Login() => JSConnector.Instance.ConnectWallet();
    }
}