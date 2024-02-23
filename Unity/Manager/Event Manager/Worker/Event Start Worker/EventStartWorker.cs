using Mirror;

namespace ForgottenEmpires.Managers.Event.Workers
{
    public class EventStartWorker
    {
        public void OnStart()
        {
            if (NetworkManager.singleton.isNetworkActive && NetworkServer.active) ServerOnStart();
            else ClientOnStart();
        }

        public void ClientOnStart()
        {

        }

        public void ServerOnStart()
        {
            
        }
    }
}