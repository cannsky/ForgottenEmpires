using ForgottenEmpires.Entity.Elements;
using System.Collections.Generic;

namespace ForgottenEmpires.Checkers
{
    public class RangeChecker : Checker
    {
        public enum Type { Single, SingleClosest, Multi }

        public Element self;
        public List<Element> targets, selectedTargets;
        public Type type;
        public float sqrRange;

        public RangeChecker(Element self, float range, List<Element> targets, Type type)
        {
            this.self = self;
            sqrRange = range * range;
            this.targets = targets;
            this.type = type;
            selectedTargets = new List<Element>();
        }

        public override bool Check()
        {
            if (CheckSelectedTargets()) return true;
            else if (CheckAllTargets()) return true;
            else return false;
        }

        public bool CheckSelectedTargets()
        {
            foreach (var selectedTarget in selectedTargets)
            {
                var result = SqrDistanceCalculation(selectedTarget);
                if (type == Type.Single && result) return true;
            }
            return false;
        }

        public bool CheckAllTargets()
        {
            foreach (var target in targets)
            {
                var result = SqrDistanceCalculation(target);
                if (type == Type.Single && SqrDistanceCalculation(target)) return true;
            }
            return false;
        }

        public bool SqrDistanceCalculation(Element target) => true;
    }
}
