using System.Collections.Generic;

namespace ForgottenEmpires.Components.MerkleTrees
{
    public class GuildMerkleTree
    {
        public List<GuildMerkleTreeNode> nodes;

        public void UpdateNodes(List<GuildMerkleTreeNode> newNodes)
        {
            nodes = newNodes ?? new List<GuildMerkleTreeNode>();
        }
    }
}