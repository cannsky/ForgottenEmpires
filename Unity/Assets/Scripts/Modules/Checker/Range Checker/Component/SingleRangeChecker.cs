using ForgottenEmpires.Entities.Elements;
using ForgottenEmpires.Managers.Server;
using System.Collections.Generic;
using UnityEngine;

namespace ForgottenEmpires.Checkers
{
    public class SingleRangeChecker : RangeChecker
    {
        public SingleRangeChecker(Element self, float range, Dictionary<uint, Element> targets) : base(self, targets, range) { }

        public override bool CheckSelectedTargets()
        {
            if (activeTargets.Count != 0 && activeTargets[0].isActive && SqrDistanceCalculation(activeTargets[0]) <= rangeSqr) return true;
            else if (activeTargets.Count > 0) activeTargets.RemoveAt(0);
            return false;
        }

        public override bool CheckAllTargets()
        {
            targetDistance = rangeSqr;
            foreach (KeyValuePair<uint, Element> target in targets)
            {
                if (target.Value == self) continue;
                else if ((tempDistance = SqrDistanceCalculation(target.Value)) <= rangeSqr && tempDistance <= targetDistance)
                {
                    if (activeTargets.Count == 0) activeTargets.Add(target.Value);
                    else activeTargets[0] = target.Value;
                    targetDistance = tempDistance;
                }
            }
            if (activeTargets.Count != 0) return true;
            else return false;
        }
    }
}