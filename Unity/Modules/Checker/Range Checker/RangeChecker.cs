using ForgottenEmpires.Entities.Elements;
using System.Collections.Generic;

namespace ForgottenEmpires.Checkers
{
    public class RangeChecker : Checker
    {
        // Reference to the self element
        public Element self;

        // Dictionary to store available targets with their unique IDs
        public Dictionary<uint, Element> targets;

        // List to store active targets within the specified range
        public List<Element> activeTargets;

        // Square of the maximum range for the range check
        public float rangeSqr;

        // Temporary distance variables for calculations
        public float tempDistance, targetDistance;

        public RangeChecker(Element self, Dictionary<uint, Element> targets, float range)
        {
            this.self = self;
            this.targets = targets;

            // Calculate and store the square of the maximum range
            rangeSqr = range * range;

            // Initialize the list of active targets
            activeTargets = new List<Element>();
        }

        public override bool Check()
        {
            // Check selected targets first, then check all targets, and return the result
            if (CheckSelectedTargets()) return true;
            else if (CheckAllTargets()) return true;
            else return false;
        }

        // Method to check for selected targets within range, implemented in derived classes
        public virtual bool CheckSelectedTargets() => false;

        // Method to check for all targets within range, implemented in derived classes
        public virtual bool CheckAllTargets() => false;

        // Method to calculate the square distance between the self element and a target
        public virtual float SqrDistanceCalculation(Element target) => (target.transform.position - self.transform.position).sqrMagnitude;
    }
}
