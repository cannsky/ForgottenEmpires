using System.Collections.Generic;

namespace ForgottenEmpires.Components.Maps
{
    public class CharacterMap
    {
        public List<CharacterMapNode> characterNodes;
        public List<CharacterCountsMapNode> characterCountsNodes;

        public void UpdateNodes(List<CharacterMapNode> newCharacterNodes, List<CharacterCountsMapNode> newCharacterCountsNodes)
        {
            characterNodes = newCharacterNodes ?? new List<CharacterMapNode>();
            characterCountsNodes = newCharacterCountsNodes ?? new List<CharacterCountsMapNode>();
        }
    }
}