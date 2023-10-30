﻿using ForgottenEmpires.Elements.PlayerWorkers;
using ForgottenEmpires.Elements.PlayerDatas;

namespace ForgottenEmpires.Elements
{
    public class Player : Element
    {
        public PlayerWorker playerWorker;
        public PlayerData playerData;

        private float health, totalHealth;

        private void Start()
        {
            playerWorker = new PlayerWorker(this);
            playerData = new PlayerData();
        }

        public override void TakeDamage(float damage) => playerWorker.playerStats.TakeDamage(damage);
    }
}