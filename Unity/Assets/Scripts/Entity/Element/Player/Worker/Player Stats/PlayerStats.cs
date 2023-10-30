namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerStats
    {
        private PlayerWorker playerWorker;

        public PlayerStats(PlayerWorker playerWorker)
        {
            this.playerWorker = playerWorker;
        }

        public void TakeDamage(float damage)
        {
            var appliedDamage = damage - playerWorker.player.playerData.armor;
            if (appliedDamage <= 0) return;
            else if ((playerWorker.player.health -= appliedDamage) <= 0) Die();
        }

        public void Die()
        {
            //TODO: Implement here.
        }
    }
}