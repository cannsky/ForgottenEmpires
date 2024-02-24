using System.Collections.Generic;

namespace ForgottenEmpires.Components.MerkleTrees
{
    public class MerkleTree
    {
        public List<MerkleTreeNode> nodes;

        public void UpdateNodes(List<MerkleTreeNode> newNodes)
        {
            nodes = newNodes ?? new List<MerkleTreeNode>();
        }
    }
}