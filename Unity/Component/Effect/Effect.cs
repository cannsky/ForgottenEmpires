using ForgottenEmpires.Entities.Elements;
using ForgottenEmpires.Types;

namespace ForgottenEmpires.Components.Effects
{
    public abstract class Effect
    {
        // Owner of the effect
        public Element owner;

        // Time of the effect
        public float time;

        // Value of the effect
        public float value;

        public abstract void Apply();
    }
}