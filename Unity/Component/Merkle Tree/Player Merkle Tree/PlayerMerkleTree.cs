using System.Collections.Generic;

namespace ForgottenEmpires.Components.MerkleTrees
{
    public class PlayerMerkleTree
    {
        public List<PlayerMerkleTreeNode> nodes;

        public void UpdateNodes(List<PlayerMerkleTreeNode> newNodes)
        {
            nodes = newNodes ?? new List<PlayerMerkleTreeNode>();
        }
    }
}