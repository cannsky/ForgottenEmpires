using UnityEngine;
using ForgottenEmpires.Entity.Elements.PlayerWorkers;
using ForgottenEmpires.Entity.Elements.PlayerDatas;
using ForgottenEmpires.Managers.Server;

namespace ForgottenEmpires.Entity.Elements
{
    public class Player : Element
    {
        public PlayerWorker playerWorker;
        public PlayerData playerData;

        public static int playerCount = 0;

        //private float health, totalHealth;

        private void Start()
        {
            playerWorker = new PlayerWorker(this);
            playerData = new PlayerData();
            //if (isServer) ServerManager.Instance
        }

        private void Update()
        {
            //if (isServer) transform.position = new Vector3(transform.position.x + (-1 * Time.deltaTime), transform.position.y, transform.position.z);
        }

        public override void TakeDamage(float damage) => playerWorker.playerStats.TakeDamage(damage);
    }
}