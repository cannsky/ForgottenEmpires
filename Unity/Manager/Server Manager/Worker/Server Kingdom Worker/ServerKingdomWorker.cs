using ForgottenEmpires.Entities.Kingdoms;
using System.Collections.Generic;

namespace ForgottenEmpires.Managers.Server.Workers
{
    public class ServerKingdomWorker
    {
        // Static variable to keep track of the total kingdom count
        public static uint kingdomCount;

        // Dictionary to store kingdom data with unique ID
        public Dictionary<uint, Kingdom> kingdoms;

        public ServerKingdomWorker() => kingdoms = new Dictionary<uint, Kingdom>();

        // Method to add a new kingdom to the dictionary
        // It assigns a unique ID to the kingdom based on playerCount
        public void AddPlayer(Kingdom kingdom) => kingdoms.Add(kingdomCount++, kingdom);

        // Method to remove a player from the dictionary using ID
        public void RemovePlayer(uint id) => kingdoms.Remove(id);
    }
}