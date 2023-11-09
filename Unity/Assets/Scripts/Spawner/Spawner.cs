using ForgottenEmpires.Entities.Elements;
using ForgottenEmpires.Spawners.Workers;
using Mirror;
using UnityEngine;

namespace ForgottenEmpires.Spawners
{
    public class Spawner : NetworkBehaviour
    {
        public SpawnerWorker spawnerWorker;

        private void Start()
        {
            this.spawnerWorker = new SpawnerWorker(this);
            spawnerWorker.OnStart();
        }

        private void Update() => spawnerWorker.OnUpdate();

        public Element InstantiateElement(GameObject prefab, Vector3 position, Transform parent) => Instantiate(prefab, position, Quaternion.identity, parent).GetComponent<Element>();
    }
}