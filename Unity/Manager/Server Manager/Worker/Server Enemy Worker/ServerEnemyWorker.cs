using ForgottenEmpires.Entities.Elements;
using ForgottenEmpires.Entities.Elements.Enemies;
using System.Collections.Generic;

namespace ForgottenEmpires.Managers.Server.Workers
{
    public class ServerEnemyWorker
    {
        // Static variable to keep track of the total enemy count
        public static uint enemyCount;

        // Dictionary to store enemy data with unique ID
        public Dictionary<uint, Element> enemies;

        public ServerEnemyWorker() => enemies = new Dictionary<uint, Element>();

        // Method to add a new enemy to the dictionary
        // It assigns a unique ID to the enemy based on enemyCount
        public void AddEnemy(Enemy enemy) => enemies.Add(enemyCount++, enemy);

        // Method to remove an enemy from the dictionary using ID
        public void RemoveEnemy(uint id) => enemies.Remove(id);
    }
}