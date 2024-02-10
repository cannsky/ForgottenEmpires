using System.Collections.Generic;

namespace ForgottenEmpires.Managers.Data.Components
{
    public class PlayerMerkleTree
    {
        public List<PlayerMerkleTreeNode> nodes;

        public void UpdateNodes(List<PlayerMerkleTreeNode> newNodes)
        {
            nodes = newNodes ?? new List<MerklPlayerMerkleTreeNodeeTreeNode>();
        }
    }
}