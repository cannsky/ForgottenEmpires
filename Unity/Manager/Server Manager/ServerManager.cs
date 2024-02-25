using UnityEngine;
using Mirror;
using ForgottenEmpires.Managers.Server.Workers;

namespace ForgottenEmpires.Managers.Server
{
    public class ServerManager : MonoBehaviour
    {
        public static ServerManager Instance;

        public ServerManagerWorker serverManagerWorker;

        private void Awake()
        {
            DontDestroyOnLoad(Instance = this);
            serverManagerWorker = new ServerManagerWorker();
        }

        private void Start()
        {
            serverManagerWorker.OnStart();
        }

        private void Update() { }

        public GameObject InstantiateGameObject(GameObject prefab) => Instantiate(prefab);

        public void DestroyGameObject(GameObject destroyedGameObject) => DestroyImmediate(destroyedGameObject);
    }
}