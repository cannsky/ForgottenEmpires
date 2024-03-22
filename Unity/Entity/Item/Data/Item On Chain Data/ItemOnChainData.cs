namespace ForgottenEmpires.Entities.Items.Data
{
    public class ItemOnChainData
    {
        public ItemData itemData;

        public uint id, statXp, damage, defense, type, value;
        public uint totalDamage, totalDefense;
        public bool consumable, upgradable, consumed;

        public ItemOnChainData(ItemData itemData) => this.itemData = itemData;

        public void UpdateOnChainTotalDamage(uint totalDamage) => this.totalDamage = totalDamage;

        public void UpdateOnChainTotalDefense(uint totalDefense) => this.totalDefense = totalDefense;

        // Update the items's data by data of DataManager.
        public void UpdatePlayerData()
        {
            // Retrieve the item's data from the DataManager.
            ItemMapNode itemMapNode = DataManager.Instance.GetPlayerData(id);
            // Update the item's data
            if (itemMapNode == null) return;
            // Update item id
            id = itemMapNode.id;
            // Update item statXp
            statXp = itemMapNode.statXp;
            // Update item defense
            defense = itemMapNode.defense;
            // Update item type
            type = itemMapNode.type;
            // Update item value
            value = itemMapNode.value;
            // Update item consumable
            consumable = itemMapNode.consumable;
            // Update item upgradable
            upgradable = itemMapNode.upgradable;
            // Update item consumed
            consumed = itemMapNode.consumed;
        }
    }
}