namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerWorker
    {
        public Player player;

        public PlayerState playerState;

        public PlayerStart playerStart;
        public PlayerUpdate playerUpdate;
        public PlayerFixedUpdate playerFixedUpdate;
        public PlayerLateUpdate playerLateUpdate;

        public PlayerAnimation playerAnimation;
        public PlayerAttack playerAttack;
        public PlayerCamera playerCamera;
        public PlayerDamage playerDamage;
        public PlayerDeath playerDeath;
        public PlayerEconomy playerEconomy;
        public PlayerEvent playerEvent;
        public PlayerInput playerInput;
        public PlayerInteraction playerInteraction;
        public PlayerInventory playerInventory;
        public PlayerMovement playerMovement;
        public PlayerRotation playerRotation;
        public PlayerStats playerStats;
        public PlayerTrails playerTrails;
        public PlayerUI playerUI;
        public PlayerVFX playerVFX;

        public PlayerWorker(Player player)
        {
            this.player = player;

            playerState = new PlayerState(this);

            playerStart = new PlayerStart(this);
            playerUpdate = new PlayerUpdate(this);
            playerFixedUpdate = new PlayerFixedUpdate(this);
            playerLateUpdate = new PlayerLateUpdate(this);

            playerAnimation = new PlayerAnimation(this);
            playerAttack = new PlayerAttack(this);
            playerCamera = new PlayerCamera(this);
            playerDamage = new PlayerDamage(this);
            playerDeath = new PlayerDeath(this);
            playerEconomy = new PlayerEconomy(this);
            playerEvent = new PlayerEvent(this);
            playerInput = new PlayerInput(this);
            playerInteraction = new PlayerInteraction(this);
            playerInventory = new PlayerInventory(this);
            playerMovement = new PlayerMovement(this);
            playerRotation = new PlayerRotation(this);
            playerStats = new PlayerStats(this);
            playerTrails = new PlayerTrails(this);
            playerUI = new PlayerUI(this);
            playerVFX = new PlayerVFX(this);
        }

        public void OnStart() => playerStart.OnStart();

        public void OnUpdate() => playerUpdate.OnUpdate();

        public void OnFixedUpdate() => playerFixedUpdate.OnFixedUpdate();

        public void OnLateUpdate() => playerLateUpdate.OnLateUpdate();
    }
}