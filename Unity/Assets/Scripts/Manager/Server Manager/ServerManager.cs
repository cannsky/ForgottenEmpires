using UnityEngine;
using ForgottenEmpires.Managers.Server.Workers;

namespace ForgottenEmpires.Managers.Server
{
    public class ServerManager : MonoBehaviour
    {
        public static ServerManager Instance;

        public ServerManagerWorker serverManagerWorker;

        private void Awake()
        {
            Instance = this;
            serverManagerWorker = new ServerManagerWorker();
        }

        private void Start() => serverManagerWorker.OnStart();

        private void Update() { }
    }
}