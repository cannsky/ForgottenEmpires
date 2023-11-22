namespace ForgottenEmpires.Entities.Elements.Workers
{
    public class ElementStats
    {
        private ElementWorker elementWorker;

        private float health, totalHealth;

        public ElementStats(ElementWorker elementWorker) => this.elementWorker = elementWorker;

        // Change element health value
        public void UpdateHealth(float value)
        {
            // If increased health value is greater than total health, health should be total health
            // If decreased health value is lower than or equal to 0, element death event will be triggered.
            if (value > 0 && (health += value) > totalHealth) health = totalHealth;
            else if ((health += value) <= 0) elementWorker.elementEvent.DeathEvent();
        }
    }
}