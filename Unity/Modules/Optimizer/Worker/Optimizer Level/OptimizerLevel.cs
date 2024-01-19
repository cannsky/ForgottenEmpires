using UnityEngine;
using System.Collections.Generic;

namespace ForgottenEmpires.Optimizers.Workers {
    public class OptimizerLevel
    {
        private OptimizerUpdate optimizerUpdate;
        private Dictionary<Vector2, List<GameObject>> optimizableObjects;
        private int clusterSize = 100;
        private int levelWidth = 1000;
        private int levelHeight = 1000;

        public OptimizerLevel()
        {
            optimizerUpdate = new OptimizerUpdate();
            optimizableObjects = new Dictionary<Vector2, List<GameObject>>();
        }

        public void InitializeLevel()
        {
            // Retrieve all game objects that should be clustered
            GameObject[] allObjects = GetAllLevelObjects();

            // Initialize optimizableObjects
            for (int x = 0; x < levelWidth; x += clusterSize)
            {
                for (int y = 0; y < levelHeight; y += clusterSize)
                {
                    Vector2 clusterIndex = new Vector2(x / clusterSize, y / clusterSize);
                    optimizableObjects[clusterIndex] = new List<GameObject>();
                }
            }

            // Assign each object to its cluster
            foreach (GameObject obj in allObjects)
            {
                Vector2 clusterIndex = GetClusterIndex(obj.transform.position);
                if (optimizableObjects.ContainsKey(clusterIndex))
                {
                    optimizableObjects[clusterIndex].Add(obj);
                }
                else
                {
                    // Handle case where object is out of bounds if necessary
                    Debug.LogWarning($"Object {obj.name} is out of level bounds.");
                }
            }
        }

        private GameObject[] GetAllLevelObjects()
        {
            // Retrieves all game objects with the tag "Optimizable"
            return GameObject.FindGameObjectsWithTag("Optimizable");
        }

        private Vector2 GetClusterIndex(Vector3 position)
        {
            int xIndex = Mathf.FloorToInt(position.x / clusterSize);
            int yIndex = Mathf.FloorToInt(position.y / clusterSize);
            return new Vector2(xIndex, yIndex);
        }
    }
}