using System.Collections.Generic;

namespace ForgottenEmpires.Components.Maps
{
    public class RuneMap
    {
        public List<RuneMapNode> runeNodes;
        public List<RunePointsNode> runePointsNodes;

        public void UpdateNodes(List<RuneMapNode> newRuneNodes, List<RunePointsNode> newRunePointsNodes)
        {
            runeNodes = newRuneNodes ?? new List<RuneMapNode>();
            runePointsNodes = newRunePointsNodes ?? new List<RunePointsNode>();
        }
    }
}