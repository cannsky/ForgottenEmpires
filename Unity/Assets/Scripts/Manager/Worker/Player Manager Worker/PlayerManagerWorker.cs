using ForgottenEmpires.Components.Actor;

namespace ForgottenEmpires.Manager.Worker
{
    public class PlayerManagerWorker
    {
        public Dictionary<uint, Player> players;

        public PlayerManagerWorker() => players = new Dictionary<uint, Player>();

        public void AddPlayer(uint id) => players.Add(id, new Player());

        public void RemovePlayer(uint id) => players.Remove(id);
    }
}