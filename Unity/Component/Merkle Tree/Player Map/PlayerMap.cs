using System.Collections.Generic;

namespace ForgottenEmpires.Components.Maps
{
    public class PlayerMap
    {
        public List<PlayerMapNode> playerNodes;
        public List<PlayerStatsNode> playerStatsNodes;

        public void UpdateNodes(List<PlayerMapNode> newPlayerNodes, List<PlayerStatsNode> newPlayerStatsNodes)
        {
            playerNodes = newPlayerNodes ?? new List<PlayerMapNode>();
            playerStatsNodes = newPlayerStatsNodes ?? new List<PlayerStatsNode>();
        }
    }
}