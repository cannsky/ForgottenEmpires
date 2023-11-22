﻿namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerWorker
    {
        public Player player;

        public PlayerStart playerStart;
        public PlayerUpdate playerUpdate;
        public PlayerFixedUpdate playerFixedUpdate;
        public PlayerLateUpdate playerLateUpdate;

        public PlayerAnimation playerAnimation;
        public PlayerAttack playerAttack;
        public PlayerCamera playerCamera;
        public PlayerDamage playerDamage;
        public PlayerEconomy playerEconomy;
        public PlayerInput playerInput;
        public PlayerInventory playerInventory;
        public PlayerMovement playerMovement;
        public PlayerRotation playerRotation;
        public PlayerStats playerStats;
        public PlayerInteraction playerInteraction;

        public PlayerWorker(Player player)
        {
            this.player = player;

            playerStart = new PlayerStart(this);
            playerUpdate = new PlayerUpdate(this);
            playerFixedUpdate = new PlayerFixedUpdate(this);
            playerLateUpdate = new PlayerLateUpdate(this);

            playerAnimation = new PlayerAnimation(this);
            playerAttack = new PlayerAttack(this);
            playerCamera = new PlayerCamera(this);
            playerDamage = new PlayerDamage(this);
            playerEconomy = new PlayerEconomy(this);
            playerInput = new PlayerInput(this);
            playerInventory = new PlayerInventory(this);
            playerMovement = new PlayerMovement(this);
            playerRotation = new PlayerRotation(this);
            playerStats = new PlayerStats(this);
            playerInteraction = new PlayerInteraction(this);
        }

        public void OnStart() => playerStart.OnStart();

        public void OnUpdate() => playerUpdate.OnUpdate();

        public void OnFixedUpdate() => playerFixedUpdate.OnFixedUpdate();

        public void OnLateUpdate() => playerLateUpdate.OnLateUpdate();
    }
}