namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerWorker
    {
        public Player player;

        public PlayerUpdate playerUpdate;
        public PlayerLateUpdate playerLateUpdate;

        public PlayerAnimation playerAnimation;
        public PlayerAttack playerAttack;
        public PlayerInput playerInput;
        public PlayerMovement playerMovement;
        public PlayerRotation playerRotation;
        public PlayerStats playerStats;

        public PlayerWorker(Player player)
        {
            this.player = player;

            playerUpdate = new PlayerUpdate(this);
            playerLateUpdate = new PlayerLateUpdate(this);

            playerAnimation = new PlayerAnimation(this);
            playerAttack = new PlayerAttack(this);
            playerInput = new PlayerInput(this);
            playerMovement = new PlayerMovement(this);
            playerRotation = new PlayerRotation(this);
            playerStats = new PlayerStats(this);
        }

        public void OnUpdate() => playerUpdate.OnUpdate();

        public void OnLateUpdate() => playerLateUpdate.OnLateUpdate();
    }
}