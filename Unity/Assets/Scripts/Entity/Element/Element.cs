using ForgottenEmpires.Types;
using Mirror;

namespace ForgottenEmpires.Entities.Elements
{
    public abstract class Element : NetworkBehaviour
    {
        // An elements state on certain situations
        public bool isActive, isEnabled;

        // Elements data used widely in the game
        public float health = 100f, totalHealth = 100f;

        // Abstract methods that all elements should have

        public abstract void Regenerate();

        public abstract void TakeDamage(float damage);

        public abstract void SetAnimation(AnimationType animationType, bool value);

        public virtual void Interact(Element element) { }
    }
}