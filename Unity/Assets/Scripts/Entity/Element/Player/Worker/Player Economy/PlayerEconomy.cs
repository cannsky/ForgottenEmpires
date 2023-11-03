namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerEconomy
    {
        private PlayerWorker playerWorker;

        private float coins;

        public PlayerEconomy(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        public void AddCoins(float coins) => this.coins += coins;

        public void DecreaseCoins(float coins) => this.coins -= coins;

        public float GetCoins() => coins;
    }
}
