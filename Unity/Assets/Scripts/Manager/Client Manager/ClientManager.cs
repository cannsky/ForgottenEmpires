using ForgottenEmpires.Managers.Client.Workers;
using UnityEngine;

namespace ForgottenEmpires.Managers.Client
{
    public class ClientManager : MonoBehaviour
    {
        public static ClientManager Instance;

        public ClientManagerWorker clientManagerWorker;

        public ClientManager()
        {
            Instance = this;
            clientManagerWorker = new ClientManagerWorker();
        }

        public void OnStart() => clientManagerWorker.OnStart();

        public void OnUpdate() => clientManagerWorker.OnUpdate();
    }
}