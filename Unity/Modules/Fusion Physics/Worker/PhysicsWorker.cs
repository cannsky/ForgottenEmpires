namespace P3F.Physics.Workers
{
    public class PhysicsWorker
    {
        public FusionPhysics fusionPhysics;

        public PhysicsCollision physicsCollision;
        public PhysicsSurface physicsSurface;

        public PhysicsWorker(FusionPhysics fusionPhysics)
        {
            this.fusionPhysics = fusionPhysics;

            physicsCollision = new PhysicsCollision(this);
            physicsSurface = new PhysicsSurface(this);
        }
    }
}