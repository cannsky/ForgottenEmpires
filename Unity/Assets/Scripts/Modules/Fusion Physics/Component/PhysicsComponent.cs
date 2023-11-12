using P3F.Physics.Data.Components;

namespace P3F.Physics.Components
{
    public abstract class PhysicsComponent
    {
        public PhysicsArea area;

        public abstract PhysicsVector3 GetPosition();
    }
}