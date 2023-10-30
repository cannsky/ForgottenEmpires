namespace ForgottenEmpires.Elements.PlayerWorkers
{
    public class PlayerWorker
    {
        public Player player;

        public PlayerInput playerInput;
        public PlayerMovement playerMovement;

        public PlayerWorker(Player player)
        {
            this.player = player;
            playerInput = new PlayerInput(this);
            playerMovement = new PlayerMovement(this);
        }
    }
}