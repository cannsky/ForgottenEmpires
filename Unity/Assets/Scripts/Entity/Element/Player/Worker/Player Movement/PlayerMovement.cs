using UnityEngine;

namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerMovement
    {
        private PlayerWorker playerWorker;

        private NavMeshAgent agent;

        public PlayerMovement(PlayerWorker playerWorker)
        {
            agent = GetComponent<NavmeshAgent>();
            this.playerWorker = playerWorker;
        }

        public void Move(Vector3 position)
        {
            agent.SetDestination(position);
        }
    }
}