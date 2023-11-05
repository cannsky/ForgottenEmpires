using Mirror;
using System.Linq;

namespace ForgottenEmpires.Managers.Server.Workers
{
    public class ServerStartWorker
    {
        public void OnStart()
        {
            if (System.Environment.GetCommandLineArgs().Any(arg => arg == "-server")) NetworkManager.singleton.StartServer();
        }
    }
}