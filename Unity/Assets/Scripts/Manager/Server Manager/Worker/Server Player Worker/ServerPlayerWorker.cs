using ForgottenEmpires.Entity.Elements;
using System.Collections.Generic;

namespace ForgottenEmpires.Managers.Server.Workers
{
    public class ServerPlayerWorker
    {
        public static uint playerCount;

        public Dictionary<uint, Element> players;

        public ServerPlayerWorker() => players = new Dictionary<uint, Element>();

        public void AddPlayer(Player player) => players.Add(playerCount++, player);

        public void RemovePlayer(uint id) => players.Remove(id);
    }
}