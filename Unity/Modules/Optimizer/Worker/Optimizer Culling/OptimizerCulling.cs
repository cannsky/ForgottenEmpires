using System.Collections;
using UnityEngine;

// Namespace for optimizer related classes to organize and manage game object optimization.
namespace ForgottenEmpires.Optimizers.Workers {
    public class OptimizerCulling
    {
        private OptimizerWorker optimizerWorker;

        public OptimizerCulling(OptimizerWorker optimizerWorker) => this.optimizerWorker = optimizerWorker;

        // Layer used to select objects for culling
        public LayerMask cullingLayer;
        // Max distance to check for culling
        public float maxCullingDistance = 100f;
        // Main camera
        private Camera cam;

        private void OnStart()
        {
            cam = Camera.main;
            StartCoroutine(CullObjectsCoroutine());
        }

        private IEnumerator CullObjectsCoroutine()
        {
            while (true)
            {
                // Cull objects
                CullObjects();
                // Wait for 0.2 seconds before next cull check
                yield return new WaitForSeconds(0.2f);
            }
        }

        private void CullObjects()
        {
            // Get all colliders within the max culling distance
            Collider[] colliders = Physics.OverlapSphere(transform.position, maxCullingDistance, cullingLayer);

            foreach (var collider in colliders)
            {
                Renderer renderer = collider.GetComponent<Renderer>();
                if (renderer != null)
                {
                    bool isVisible = GeometryUtility.TestPlanesAABB(GeometryUtility.CalculateFrustumPlanes(cam), renderer.bounds);
                    bool isWithinDistance = Vector3.Distance(transform.position, renderer.transform.position) <= maxCullingDistance;

                    // Enable renderer if object is within view frustum and within distance, otherwise disable
                    renderer.enabled = isVisible && isWithinDistance;
                }
            }
        }
    }
}