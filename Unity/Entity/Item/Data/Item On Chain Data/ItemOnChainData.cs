namespace ForgottenEmpires.Entities.Items.Data
{
    public class ItemOnChainData
    {
        public ItemData itemData;

        public uint id, statXp, damage, defense, type, value;
        public uint totalDamage, totalDefense;
        public bool consumable, upgradable, consumed;

        public ItemOnChainData(ItemData itemData) => this.itemData = itemData;

        public void UpdateOnChainItemStats(uint totalDamage, uint totalDefense){
            this.totalDamage = totalDamage;
            this.totalDefense = totalDefense;
        }
    }
}