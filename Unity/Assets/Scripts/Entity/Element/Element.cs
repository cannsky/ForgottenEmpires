using ForgottenEmpires.Types;
using Mirror;

namespace ForgottenEmpires.Entities.Elements
{
    public abstract class Element : NetworkBehaviour
    {
        public bool isActive, isEnabled;

        public float health = 100f, totalHealth = 100f;

        public abstract void Regenerate();

        public abstract void TakeDamage(float damage);

        public abstract void SetAnimation(AnimationType animationType, bool value);

        public virtual void Interact(Element element) { }
    }
}