using ForgottenEmpires.Checkers;
using ForgottenEmpires.Managers.Server;
using System.Collections.Generic;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerAttack
    {
        private PlayerWorker playerWorker;

        private SingleRangeChecker singleRangeChecker;

        public PlayerAttack(PlayerWorker playerWorker)
        {
            this.playerWorker = playerWorker;
            singleRangeChecker = new SingleRangeChecker(playerWorker.player, 2f, 
                ServerManager.Instance.serverManagerWorker.serverPlayerWorker.players);
        }

        public void Attack()
        {
            if (!singleRangeChecker.Check()) return;
            singleRangeChecker.targets[0].TakeDamage(10f);
        }
    }
}