using System.Collections.Generic;

namespace ForgottenEmpires.Components.Maps
{
    public class ItemMap
    {
        public List<ItemMapNode> itemNodes;
        public List<EquippedItemMapNode> equippedItemNodes;
        public List<ConsumedItemMapNode> consumedItemNodes;
        public uint itemCount;

        public void UpdateNodes(List<ItemMapNode> newItemNodes, List<EquippedItemMapNode> newEquippedItemNodes, List<ConsumedItemMapNode> newConsumedItemNodes, uint newItemCount)
        {
            itemNodes = newItemNodes ?? new List<ItemMapNode>();
            equippedItemNodes = newEquippedItemNodes ?? new List<EquippedItemMapNode>();
            consumedItemNodes = newConsumedItemNodes ?? new List<ConsumedItemMapNode>();
            itemCount = newItemCount ?? 0;
        }
    }
}