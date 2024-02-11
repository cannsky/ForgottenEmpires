namespace ForgottenEmpires.Entities.Items.Data
{
    public class ItemOnChainData
    {
        public ItemData itemData;

        public uint id, statXp, damage, defense, type, value;
        public bool consumable, upgradable, consumed;

        public ItemOnChainData(ItemData itemData) => this.itemData = itemData;
    }
}