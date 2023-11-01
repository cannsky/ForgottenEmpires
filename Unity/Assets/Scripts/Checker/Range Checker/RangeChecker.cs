using ForgottenEmpires.Entity.Elements;
using System.Collections.Generic;

namespace ForgottenEmpires.Checkers
{
    public class RangeChecker : Checker
    {
        public Element self;
        public Dictionary<uint, Element> targets, activeTargets;
        public float rangeSqr, tempDistance, targetDistance;

        public RangeChecker(Element self, Dictionary<uint, Element> targets, float range)
        {
            this.self = self;
            this.targets = targets;
            rangeSqr = range * range;
            activeTargets = new Dictionary<uint, Element>();
        }

        public override bool Check()
        {
            if (CheckSelectedTargets()) return true;
            else if (CheckAllTargets()) return true;
            else return false;
        }

        public virtual bool CheckSelectedTargets() => false;

        public virtual bool CheckAllTargets() => false;

        public virtual float SqrDistanceCalculation(Element target) => (target.transform.position - self.transform.position).sqrMagnitude;
    }
}
