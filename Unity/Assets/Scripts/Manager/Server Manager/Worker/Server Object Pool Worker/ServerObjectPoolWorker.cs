using Mirror;
using System.Collections.Generic;
using UnityEngine;

namespace ForgottenEmpires.Managers.Server.Workers
{
    public class ServerObjectPoolWorker
    {
        private Dictionary<GameObject, List<GameObject>> poolDictionary = new Dictionary<GameObject, List<GameObject>>();

        // Get or create a pooled object
        public GameObject GetPooledObject(GameObject prefab)
        {
            if (!poolDictionary.ContainsKey(prefab)) InitializePool(prefab, 10);

            foreach (var obj in poolDictionary[prefab])
            {
                if (!obj.activeInHierarchy)
                {
                    obj.SetActive(true);
                    NetworkServer.UnSpawn(obj);
                    NetworkServer.Spawn(obj);
                    return obj;
                }
            }

            GameObject newObj = ServerManager.Instance.InstantiateGameObject(prefab);
            poolDictionary[prefab].Add(newObj);
            NetworkServer.Spawn(newObj);
            return newObj;
        }

        // Return an object to the pool
        public void ReturnToPool(GameObject obj)
        {
            NetworkServer.UnSpawn(obj);
            obj.SetActive(false);
        }

        // Initialize the pool with a certain number of objects (optional)
        public void InitializePool(GameObject prefab, int count)
        {
            if (!poolDictionary.ContainsKey(prefab)) poolDictionary[prefab] = new List<GameObject>();

            for (int i = 0; i < count; i++)
            {
                GameObject newObj = ServerManager.Instance.InstantiateGameObject(prefab);
                newObj.SetActive(false);
                NetworkServer.Spawn(newObj);
                poolDictionary[prefab].Add(newObj);
            }
        }
    }
}