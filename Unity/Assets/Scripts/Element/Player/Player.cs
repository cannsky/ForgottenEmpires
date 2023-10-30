using ForgottenEmpires.Elements.PlayerWorkers;

namespace ForgottenEmpires.Elements
{
    public class Player : Element
    {
        public PlayerWorker playerWorker;

        private float health, totalHealth;

        private void Start()
        {
            playerWorker = new PlayerWorker(this);
        }
    }
}