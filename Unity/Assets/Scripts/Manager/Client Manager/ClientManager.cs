using ForgottenEmpires.Managers.Client.Workers;
using Mirror;

namespace ForgottenEmpires.Managers.Client
{
    public class ClientManager
    {
        public static ClientManager Instance;

        public ClientManagerWorker clientManagerWorker;

        public ClientManager()
        {
            Instance = this;
            clientManagerWorker = new ClientManagerWorker();
        }

        public void OnStart() => clientManagerWorker.OnStart();

        public void OnUpdate() { }
    }
}