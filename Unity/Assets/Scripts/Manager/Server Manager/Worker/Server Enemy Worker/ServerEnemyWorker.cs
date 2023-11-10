using ForgottenEmpires.Entities.Elements;
using ForgottenEmpires.Entities.Elements.Enemies;
using System.Collections.Generic;

namespace ForgottenEmpires.Managers.Server.Workers
{
    public class ServerEnemyWorker
    {
        public static uint enemyCount;

        public Dictionary<uint, Element> enemies;

        public ServerEnemyWorker() => enemies = new Dictionary<uint, Element>();

        public void AddEnemy(Enemy enemy) => enemies.Add(enemyCount++, enemy);

        public void RemoveEnemy(uint id) => enemies.Remove(id);
    }
}