using ForgottenEmpires.Managers.Client.Workers;
using UnityEngine;

namespace ForgottenEmpires.Managers.Client
{
    public class ClientManager : MonoBehaviour
    {
        public static ClientManager Instance;

        public ClientManagerWorker clientManagerWorker;

        private void Awake()
        {
            Instance = this;
            clientManagerWorker = new ClientManagerWorker();
        }

        private void Start() => clientManagerWorker.OnStart();

        private void Update() => clientManagerWorker.OnUpdate();
    }
}