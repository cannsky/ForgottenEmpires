using ForgottenEmpires.Entities.Elements;
using System.Collections.Generic;

namespace ForgottenEmpires.Managers.Server.Workers
{
    public class ServerPlayerWorker
    {
        // Static variable to keep track of the total player count
        public static uint playerCount;

        // Dictionary to store player data with unique ID
        public static Dictionary<uint, Element> players;

        public ServerPlayerWorker() => players = new Dictionary<uint, Element>();

        // Method to add a new player to the dictionary
        // It assigns a unique ID to the player based on playerCount
        public static void AddPlayer(Player player) => players.Add(playerCount++, player);

        // Method to remove a player from the dictionary using ID
        public static void RemovePlayer(uint id) => players.Remove(id);
    }
}