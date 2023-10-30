namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerWorker
    {
        public Player player;

        public PlayerAttack playerAttack;
        public PlayerInput playerInput;
        public PlayerMovement playerMovement;
        public PlayerStats playerStats;

        public PlayerWorker(Player player)
        {
            this.player = player;
            playerAttack = new PlayerAttack(this);
            playerInput = new PlayerInput(this);
            playerMovement = new PlayerMovement(this);
            playerStats = new PlayerStats(this);
        }
    }
}