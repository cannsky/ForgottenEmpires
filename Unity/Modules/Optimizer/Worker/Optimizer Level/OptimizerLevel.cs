using UnityEngine;
using System.Collections.Generic;

// Namespace for optimizer related classes to organize and manage game object optimization.
namespace ForgottenEmpires.Optimizers.Workers {
    // Class responsible for managing optimization levels in the game.
    public class OptimizerLevel
    {
        // Field for updating optimization-related parameters.
        private OptimizerUpdate optimizerUpdate;

        // Dictionary to hold game objects categorized by their cluster positions.
        private Dictionary<Vector2, List<GameObject>> optimizableObjects;

        // Size of each cluster square. Objects within this range are batched together.
        private int clusterSize = 100;

        // Width of the entire level, used for initializing cluster grid.
        private int levelWidth = 1000;

        // Height of the entire level, used for initializing cluster grid.
        private int levelHeight = 1000;

        // Constructor initializes the optimizer update logic and the dictionary for optimizable objects.
        public OptimizerLevel()
        {
            optimizableObjects = new Dictionary<Vector2, List<GameObject>>();
        }

        // Initializes the level with cluster-based optimization for game objects.
        public void InitializeLevel()
        {
            // Retrieve all game objects that should be clustered.
            GameObject[] allObjects = GetAllLevelObjects();

            // Initialize optimizableObjects by dividing the level into clusters based on clusterSize.
            for (int x = 0; x < levelWidth; x += clusterSize)
            {
                for (int y = 0; y < levelHeight; y += clusterSize)
                {
                    Vector2 clusterIndex = new Vector2(x / clusterSize, y / clusterSize);
                    optimizableObjects[clusterIndex] = new List<GameObject>();
                }
            }

            // Assign each object to its cluster based on its position.
            foreach (GameObject obj in allObjects)
            {
                Vector2 clusterIndex = GetClusterIndex(obj.transform.position);
                if (optimizableObjects.ContainsKey(clusterIndex))
                {
                    optimizableObjects[clusterIndex].Add(obj);
                }
                else
                {
                    // Log warning if an object is out of the defined level bounds.
                    Debug.LogWarning($"Object {obj.name} is out of level bounds.");
                }
            }
        }

        // Helper method to get all game objects in the level that can be optimized.
        private GameObject[] GetAllLevelObjects()
        {
            // Retrieves all game objects in the scene with the tag "Optimizable".
            return GameObject.FindGameObjectsWithTag("Optimizable");
        }

        // Calculates and returns the cluster index for a given position.
        private Vector2 GetClusterIndex(Vector3 position)
        {
            // Determines the cluster's x and y indices based on the object's position and cluster size.
            int xIndex = Mathf.FloorToInt(position.x / clusterSize);
            int yIndex = Mathf.FloorToInt(position.y / clusterSize);
            return new Vector2(xIndex, yIndex);
        }
    }
}