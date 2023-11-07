using UnityEngine;
using ForgottenEmpires.Managers.Server.Workers;

namespace ForgottenEmpires.Managers.Server
{
    public class ServerManager : MonoBehaviour
    {
        public static ServerManager Instance;

        public ServerManagerWorker serverManagerWorker;

        public ServerManager()
        {
            Instance = this;
            serverManagerWorker = new ServerManagerWorker();
        }

        public void OnStart() => serverManagerWorker.OnStart();

        public void OnUpdate() { }
    }
}