using ForgottenEmpires.Entities.Elements.Enemies.Workers;
using ForgottenEmpires.Managers.Server;
using ForgottenEmpires.Types;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.Enemies
{
    public class Enemy : Element
    {
        public EnemyWorker enemyWorker;

        private void Start()
        {
            enemyWorker = new EnemyWorker(this);
            ServerManager.Instance.serverManagerWorker.serverEnemyWorker.AddEnemy(this);
            enemyWorker.OnStart();
        }

        private void Update() => enemyWorker.OnUpdate();

        public override void Regenerate()
        {
            throw new System.NotImplementedException();
        }

        public override void TakeDamage(float damage)
        {
            health -= damage;
            if (health < 0) Destroy(gameObject);
        }

        public override void SetAnimation(AnimationType animationType, bool value) => enemyWorker.enemyAnimation.SetAnimation(animationType, value);
    }
}