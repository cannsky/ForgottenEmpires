using P3F.Physics.Components;
using System.Collections.Generic;

namespace P3F.Physics.Data.Components
{
    public class PhysicsArea
    {
        public int x, y, z, width, height, length, i, j, k;

        public List<PhysicsComponent> components;

        public PhysicsArea(int x, int y, int z, int width, int height, int length, int i, int j, int k)
        {
            this.x = x;
            this.y = y;
            this.z = z;
            this.width = width;
            this.height = height;
            this.length = length;
            this.i = i;
            this.j = j;
            this.k = k;
            components = new List<PhysicsComponent>();
        }

        public bool CheckArea(int i, int j, int k) => i == this.i && j == this.j && k == this.k;
    }
}
