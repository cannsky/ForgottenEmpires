using UnityEngine;
using UnityEngine.AI;

namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerMovement
    {
        private PlayerWorker playerWorker;

        private NavMeshAgent agent;

        public PlayerMovement(PlayerWorker playerWorker)
        {
            agent = playerWorker.player.GetComponent<NavMeshAgent>();
            this.playerWorker = playerWorker;
        }

        public void TryMove(Vector2 position)
        {
            agent.SetDestination(position);
        }
    }
}