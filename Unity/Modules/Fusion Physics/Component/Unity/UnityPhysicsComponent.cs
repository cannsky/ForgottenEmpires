using UnityEngine;

namespace P3F.Physics.Components.Unity
{
    public class UnityPhysicsComponent : PhysicsComponent
    {
        public Transform transform;

        public override PhysicsVector3 GetPosition() => new PhysicsVector3(
            transform.position.x, 
            transform.position.y, 
            transform.position.z);
    }
}