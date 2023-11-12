using P3F.Physics.Components;
using P3F.Physics.Data.Components;

namespace P3F.Physics.Data
{
    public class PhysicsData
    {
        private int width, height, length, w, h, l, wCount, hCount, lCount;

        private PhysicsArea[,,] areas;

        public PhysicsData(int width, int height, int length, int w, int h, int l)
        {
            this.width = width;
            this.height = height;
            this.length = length;
            this.w = w;
            this.h = h;
            this.l = l;
            GenerateAreas();
        }

        public void GenerateAreas()
        {
            wCount = width / w;
            hCount = height / h;
            lCount = length / l;
            areas = new PhysicsArea[wCount, hCount, lCount];
            for (int i = 0; i < wCount; i++)
                for (int j = 0; j < hCount; j++)
                    for (int k = 0; k < lCount; k++)
                        areas[i, j, k] = new PhysicsArea(i * w, j * h, k * l, w, h, l, i, j, k);
        }

        public void CalculateDimensions(PhysicsComponent physicsComponent, out int i, out int j, out int k)
        {
            PhysicsVector3 physicsVector3 = physicsComponent.GetPosition();
            i = (int) physicsVector3.x % w;
            j = (int) physicsVector3.y % h;
            k = (int) physicsVector3.z % l;
        }

        //Called Frequently

        public void UpdateComponent(PhysicsComponent physicsComponent)
        {
            CalculateDimensions(physicsComponent, out int i, out int j, out int k);
            if (CheckComponentArea(physicsComponent, i, j, k)) return;
            RemoveComponent(physicsComponent);
            AddComponent(physicsComponent, i, j, k);
        }

        public bool CheckComponentArea(PhysicsComponent physicsComponent, int i, int j, int k) => physicsComponent.area.CheckArea(i, j, k);

        public void AddComponent(PhysicsComponent physicsComponent, int i, int j, int k) => areas[i, j, k].components.Add(physicsComponent);

        public void RemoveComponent(PhysicsComponent physicsComponent) => physicsComponent.area.components.Remove(physicsComponent);

        //Called Non-Frequently

        public void AddComponent(PhysicsComponent physicsComponent)
        {
            CalculateDimensions(physicsComponent, out int i, out int j, out int k);
            areas[i, j, k].components.Add(physicsComponent);
        }
    }
}