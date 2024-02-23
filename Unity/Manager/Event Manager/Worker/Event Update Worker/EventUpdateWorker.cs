using Mirror;

namespace ForgottenEmpires.Managers.Event.Workers
{
    public class EventUpdateWorker
    {
        public void OnUpdate()
        {
            if (NetworkManager.singleton.isNetworkActive && NetworkServer.active) ServerOnUpdate();
            else ClientOnUpdate();
        }
        
        public void ClientOnUpdate()
        {

        }

        public void ServerOnUpdate()
        {
            
        }
    }
}