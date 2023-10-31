using ForgottenEmpires.Managers.Server.Workers;

namespace ForgottenEmpires.Managers.Server
{
    public class ServerManager
    {
        public static ServerManager Instance;

        public ServerStartWorker serverStartWorker;

        public ServerManager()
        {
            Instance = this;
            serverStartWorker = new ServerStartWorker();
        }

        public void OnStart() { }

        public void OnUpdate() { }
    }
}