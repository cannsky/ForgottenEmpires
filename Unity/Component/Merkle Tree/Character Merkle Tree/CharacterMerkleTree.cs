using System.Collections.Generic;

namespace ForgottenEmpires.Components.MerkleTrees
{
    public class CharacterMerkleTree
    {
        public List<CharacterMerkleTreeNode> nodes;

        public void UpdateNodes(List<CharacterMerkleTreeNode> newNodes)
        {
            nodes = newNodes ?? new List<CharacterMerkleTreeNode>();
        }
    }
}