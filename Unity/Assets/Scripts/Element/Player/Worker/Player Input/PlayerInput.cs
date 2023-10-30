using System;
using UnityEngine;

namespace ForgottenEmpires.Elements.PlayerWorkers
{
    public class PlayerInput
    {
        private PlayerWorker playerWorker;

        private int terrainLayerMask;
        private Camera mainCamera;
        public Vector3 position;

        public PlayerInput(PlayerWorker playerWorker)
        {
            mainCamera = Camera.main;
            terrainLayerMask = LayerMask.GetMask("Terrain");
            this.playerWorker = playerWorker;
        }

        public void OnUpdate() => CheckRightClickInput();

        public void CheckRightClickInput()
        {
            if (Input.GetMouseButtonDown(1)) // Right click is represented by 1
            {
                Ray ray = mainCamera.ScreenPointToRay(Input.mousePosition);
                RaycastHit hit;

                if (Physics.Raycast(ray, out hit, Mathf.Infinity, terrainLayerMask))
                {
                    position = hit.point;
                }
            }
        }
    }
}