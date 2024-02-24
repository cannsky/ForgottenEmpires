using System.Collections.Generic;

namespace ForgottenEmpires.Managers.Data.Components
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