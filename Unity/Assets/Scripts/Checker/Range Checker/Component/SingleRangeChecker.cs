using ForgottenEmpires.Entity.Elements;
using System.Collections.Generic;
using UnityEngine;

namespace ForgottenEmpires.Checkers
{
    public class SingleRangeChecker : RangeChecker
    {
        public SingleRangeChecker(Element self, float range, List<Element> targets) : base(self, targets, range) { }

        public override bool CheckSelectedTargets()
        {
            if (targets[0] != null && targets[0].isActive && SqrDistanceCalculation(targets[0]) >= rangeSqr) return true;
            targets[0] = null;
            return false;
        }

        public override bool CheckAllTargets()
        {
            foreach(Element target in targets)
            {
                if ((tempDistance = SqrDistanceCalculation(target)) <= rangeSqr && tempDistance <= targetDistance)
                {
                    targets[0] = target;
                    targetDistance = tempDistance;
                }
            }
            if (targets[0] != null) return true;
            else return false;
        }
    }
}