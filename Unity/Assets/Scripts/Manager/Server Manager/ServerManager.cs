using ForgottenEmpires.Managers.Server.Workers;

namespace ForgottenEmpires.Managers.Server
{
    public class ServerManager
    {
        public static ServerManager Instance;

        public ServerManagerWorker serverManagerWorker;

        public ServerManager()
        {
            Instance = this;
            serverManagerWorker = new ServerManagerWorker();
        }

        public void OnStart() { }

        public void OnUpdate() { }
    }
}