using ForgottenEmpires.Entity.Elements.Enemies.Workers;
using ForgottenEmpires.Entity.Elements.PlayerWorkers;
using ForgottenEmpires.Types;
using Mirror;

namespace ForgottenEmpires.Entity.Elements.Enemies
{
    public class Enemy : Element
    {
        public EnemyWorker enemyWorker;

        private void Start()
        {
            enemyWorker = new EnemyWorker(this);
            enemyWorker.OnStart();
        }

        private void Update() => enemyWorker.OnUpdate();

        public override void TakeDamage(float damage)
        {
            //Not implemented yet.
        }

        public override void SetAnimation(AnimationType animationType, bool value) => EnemyAnimationClientRpc(animationType, value);

        [ClientRpc] public void EnemyAnimationClientRpc(AnimationType animationType, bool value) => enemyWorker.enemy.SetAnimation(animationType, value);
    }
}