using ForgottenEmpires.Validators;

namespace ForgottenEmpires.Validators.Checkers
{
    /*
    public class DistanceValidator : Validator
    {
        public enum Type { Single, SingleClosest, Multi, MultiLimited}

        public GameElement self;
        public List<GameElement> targets, selectedTargets;
        public Type type;
        public float sqrRange;

        public DistanceValidator(GameElement self, float range, List<GameElement> targets, Type type)
        {
            this.self = self;
            sqrRange = range * range;
            this.targets = targets;
            this.type = type;
            selectedTargets = new List<GameElement>();
        }

        public override bool Validate()
        {
            if (ValidateSelectedTargets()) return true;
            else if (ValidateAllTargets()) return true;
            else return false;
        }

        public bool ValidateSelectedTargets()
        {
            foreach (var selectedTarget in selectedTargets)
            {
                var result = SqrDistanceCalculation(selectedTarget);
                if (type == Type.Single && result) return true;
            }
            return false;
        }

        public bool ValidateAllTargets()
        {
            foreach (var target in targets)
            {
                var result = SqrDistanceCalculation(target);
                if (type == Type.Single && SqrDistanceCalculation(target)) return true;
            }
            return false;
        }

        public bool SqrDistanceCalculation(GameElement target) => true;

        /*
        public bool SqrDistanceCalculation(Entity target) 
        {
            if (!(target.transform.position - self.transform.position).sqrMagnitude < sqrRange) return false;
            return true;
        }
        
    }
    */
}
