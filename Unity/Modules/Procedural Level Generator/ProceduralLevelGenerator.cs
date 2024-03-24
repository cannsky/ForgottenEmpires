using UnityEngine;

// A class for procedurally generating a level with Unity's MonoBehaviour.
public class ProceduralLevelDesigner : MonoBehaviour
{
    // Prefabs for the ground, walls, and fences to be instantiated.
    public GameObject groundPrefab;
    public GameObject wallPrefab;
    public GameObject fencePrefab;

    // A Light component to illuminate the scene.
    public Light sceneLight;

    // Dimensions of the level.
    public int width = 20; // Adjusted for larger space
    public int height = 20; // Adjusted for larger space

    // Start is called before the first frame update.
    void Start()
    {
        // Generate the level when the game starts.
        GenerateLevel();
    }

    // Generates the overall structure of the level.
    void GenerateLevel()
    {
        // Define the size of each cluster within the level.
        int clusterWidth = width / 2;
        int clusterHeight = height / 2;

        // Loop to generate each cluster based on the total number of clusters.
        for (int clusterX = 0; clusterX < 2; clusterX++)
        {
            for (int clusterZ = 0; clusterZ < 2; clusterZ++)
            {
                // Generate an individual cluster.
                GenerateCluster(clusterX * clusterWidth, clusterZ * clusterHeight, clusterWidth, clusterHeight);
            }
        }

        // Add or configure the scene's lighting if not manually added in the editor.
        if (sceneLight == null)
        {
            // Create a new directional light if one isn't provided.
            sceneLight = new GameObject("Scene Light").AddComponent<Light>();
            sceneLight.type = LightType.Directional;
        }
        // Position and orient the light to simulate sunlight or moonlight.
        sceneLight.transform.position = new Vector3(width / 2, 10, height / 2);
        sceneLight.transform.rotation = Quaternion.Euler(50, -30, 0);
    }

    // Generates the contents of a cluster, including ground, walls, and fences.
    void GenerateCluster(int startX, int startZ, int clusterWidth, int clusterHeight)
    {
        // Loop through the cluster's dimensions to place objects.
        for (int x = startX; x < startX + clusterWidth; x++)
        {
            for (int z = startZ; z < startZ + clusterHeight; z++)
            {
                // Place ground tiles throughout the entire cluster.
                PlaceGround(x, z);

                // Randomly place fences or other objects to populate the cluster.
                if (Random.value > 0.85f) // With a low chance for openness.
                {
                    Instantiate(fencePrefab, new Vector3(x, 0, z), Quaternion.identity);
                }

                // Surround the cluster with walls, occasionally leaving openings for paths.
                if (x == startX || z == startZ || x == startX + clusterWidth - 1 || z == startZ + clusterHeight - 1)
                {
                    if (Random.value > 0.2f) // Occasionally leave gaps for entry/exit.
                    {
                        Instantiate(wallPrefab, new Vector3(x, 0, z), Quaternion.identity);
                    }
                }
            }
        }
    }

    // Method to place ground tiles at specified coordinates.
    void PlaceGround(int x, int z)
    {
        // Instantiate a ground prefab at the given coordinates.
        Instantiate(groundPrefab, new Vector3(x, 0, z), Quaternion.identity);
    }
}