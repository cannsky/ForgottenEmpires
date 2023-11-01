using ForgottenEmpires.Entity.Elements;
using System.Collections.Generic;
using UnityEngine;

namespace ForgottenEmpires.Checkers
{
    public class SingleRangeChecker : RangeChecker
    {
        public SingleRangeChecker(Element self, float range, Dictionary<uint, Element> targets) : base(self, targets, range) { }

        public override bool CheckSelectedTargets()
        {
            if (activeTargets[0] != null && activeTargets[0].isActive && SqrDistanceCalculation(activeTargets[0]) <= rangeSqr) return true;
            activeTargets[0] = null;
            return false;
        }

        public override bool CheckAllTargets()
        {
            foreach(KeyValuePair<uint, Element> target in targets)
            {
                if ((tempDistance = SqrDistanceCalculation(target.Value)) <= rangeSqr && tempDistance <= targetDistance)
                {
                    activeTargets[0] = target.Value;
                    targetDistance = tempDistance;
                }
            }
            if (activeTargets[0] != null) return true;
            else return false;
        }
    }
}