using ForgottenEmpires.Entity.Elements;
using System.Collections.Generic;

namespace ForgottenEmpires.Managers.Server.Workers
{
    public class ServerPlayerWorker
    {
        public Dictionary<uint, Player> players;

        public ServerPlayerWorker() => players = new Dictionary<uint, Player>();

        public void AddPlayer(uint id) => players.Add(id, new Player());

        public void RemovePlayer(uint id) => players.Remove(id);
    }
}