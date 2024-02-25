using System.Collections.Generic;

namespace ForgottenEmpires.Components.Maps
{
    public class GuildMap
    {
        public List<GuildMapNode> guildNodes;
        public List<PlayerGuildMapNode> playerGuildNodes;
        public uint guildCount;

        public void UpdateNodes(List<GuildMapNode> newGuildNodes, List<PlayerGuildMapNode> newPlayerGuildNodes, uint newGuildCount)
        {
            guildNodes = newGuildNodes ?? new List<GuildMapNode>();
            playerGuildNodes = newPlayerGuildNodes ?? new List<PlayerGuildMapNode>();
            guildCount = newGuildCount ?? 0;
        }
    }
}