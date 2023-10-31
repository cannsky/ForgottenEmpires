﻿using ForgottenEmpires.Checkers;
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
            rangeChecker = new RangeChecker(
                playerWorker.player, 
                5f, 
                new List<Element>(), 
                RangeChecker.Type.Single);
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