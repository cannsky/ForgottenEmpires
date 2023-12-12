using ForgottenEmpires.Entities.Elements.Enemies.Workers;
using ForgottenEmpires.Managers.Server;
using ForgottenEmpires.Types;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.Enemies
{
    public class Enemy : Element
    {
        // The worker responsible for handling enemy works
        public EnemyWorker enemyWorker;

        public override void Start()
        {
            // Call element's start method
            base.Start();

            // Initialize the enemy worker for enemy.
            enemyWorker = new EnemyWorker(this);

            // Add enemy to the server's enemy list
            ServerManager.Instance.serverManagerWorker.serverEnemyWorker.AddEnemy(this);

            // Call enemy worker on start method
            enemyWorker.OnStart();
        }

        public override void Update()
        {
            // Call element's update method
            base.Update();

            // Call enemy worker on update method
            enemyWorker.OnUpdate();
        }

        public override void Regenerate()
        {
            throw new System.NotImplementedException();
        }

        // Handle when the enemy takes damage.
        public override void TakeDamage(float damage)
        {
            // Reduce the enemy's health by the amount of damage.
            health -= damage;
            // If the enemy's health is lower than or equal to zero, destroy the enemy object.
            if (health < 0) Destroy(gameObject);
        }

        public override void SetAnimation(AnimationType animationType, bool value) => enemyWorker.enemyAnimation.SetAnimation(animationType, value);
    }
}