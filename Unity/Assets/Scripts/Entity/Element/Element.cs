using ForgottenEmpires.Components.Effects;
using ForgottenEmpires.Entities.Elements.Workers;
using ForgottenEmpires.Entities.Kingdoms;
using ForgottenEmpires.Types;
using Mirror;

namespace ForgottenEmpires.Entities.Elements
{
    public abstract class Element : NetworkBehaviour
    {
        // Element's kingdom
        public Kingdom kingdom;

        // Element's worker
        public ElementWorker elementWorker;

        // An element's state on certain situations
        public bool isActive, isEnabled;

        // Elements data used widely in the game
        public float health = 100f, totalHealth = 100f;

        // Start is called once in the game object start
        public virtual void Start() => elementWorker = new ElementWorker(this);

        // Update is called in each frame of the game while game object is active
        public virtual void Update() => elementWorker.OnUpdate();

        // Abstract methods that all elements should have

        public abstract void Regenerate();

        public abstract void TakeDamage(float damage);

        public abstract void SetAnimation(AnimationType animationType, bool value);

        // Virtual methods

        public virtual void Interact(Element element) { }

        public virtual void AddEffect(Effect effect) { }
    }
}