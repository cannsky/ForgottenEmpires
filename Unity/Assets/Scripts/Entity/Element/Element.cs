using ForgottenEmpires.Types;
using Mirror;

namespace ForgottenEmpires.Entity.Elements
{
    public abstract class Element : NetworkBehaviour
    {
        public float health, totalHealth;

        public abstract void TakeDamage(float damage);

        public abstract void SetAnimation(AnimationType animationType, bool value);
    }
}