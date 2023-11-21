namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerPotionStats
    {
        private PlayerStats playerStats;

        private float healthPotionTimer;

        private float healthPotionRegen;

        public PlayerPotionStats(PlayerStats playerStats)
        {
            this.playerStats = playerStats;
        }


    }
}