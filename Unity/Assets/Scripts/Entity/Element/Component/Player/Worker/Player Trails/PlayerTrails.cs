using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerTrails
    {
        private PlayerWorker playerWorker;

        private Transform trailTransform;

        public PlayerTrails(PlayerWorker playerWorker) 
        {
            this.playerWorker = playerWorker;
        }

        public void ToggleTrails() => trailTransform.gameObject.SetActive(!trailTransform.gameObject.activeSelf);
    }
}
