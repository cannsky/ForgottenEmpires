using ForgottenEmpires.Checkers;
using System.Collections.Generic;

namespace ForgottenEmpires.Entity.Elements.PlayerWorkers
{
    public class PlayerAttack
    {
        private Player player;

        public RangeChecker rangeChecker;

        public PlayerAttack(PlayerWorker playerWorker)
        {
            //Temporary.
        }

        public void Attack()
        {
            if (rangeChecker.Check())
            {
                //APPLY DAMAGE HERE!
            }
        }
    }
}