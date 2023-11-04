using ForgottenEmpires.Entity.Elements;
using System.Collections.Generic;
using UnityEngine;

namespace ForgottenEmpires.Spawners.Workers
{
    public class SpawnerGenerator
    {
        private SpawnerWorker spawnerWorker;
        private GameObject prefab;
        private List<Element> elements;
        private int maxInstances = 10;
        private float radius = 10f;

        private Vector2 spawnCircle;
        private Vector3 spawnPosition;
        private GameObject instance;

        public SpawnerGenerator(SpawnerWorker spawnerWorker)
        {
            this.spawnerWorker = spawnerWorker;
            prefab = spawnerWorker.spawner.transform.GetChild(0).gameObject;
            elements = new List<Element>();
        }

        public void OnUpdate()
        {
            if (elements.Count < maxInstances) Spawn();
        }

        public void Spawn()
        {
            spawnCircle = Random.insideUnitCircle * radius;
            spawnPosition = new Vector3(spawnCircle.x, 0, spawnCircle.y);
            Element element = spawnerWorker.spawner.InstantiateElement(prefab, spawnPosition, spawnerWorker.spawner.transform);
            AddElement(element);
        }

        public void AddElement(Element element) => elements.Add(element);

        public void RemoveElement(Element element) => elements.Remove(element);
    }
}