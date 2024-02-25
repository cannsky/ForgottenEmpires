using System.Collections.Generic;

namespace ForgottenEmpires.Components.Maps
{
    public class KingdomMap
    {
        public List<KingdomMapNode> kingdomNodes;
        public List<PlayerKingdomMapNode> playerKingdomNodes;
        public uint kingdomCount;

        public void UpdateNodes(List<KingdomMapNode> newKingdomNodes, List<PlayerKingdomMapNode> newPlayerKingdomNodes, uint newKingdomCount)
        {
            kingdomNodes = newKingdomNodes ?? new List<KingdomMapNode>();
            playerKingdomNodes = newPlayerKingdomNodes ?? new List<PlayerKingdomMapNode>();
            kingdomCount = newKingdomCount ?? 0;
        }
    }
}