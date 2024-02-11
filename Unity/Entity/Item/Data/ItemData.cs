namespace ForgottenEmpires.Entities.Items.Data
{
    public class ItemData
    {
        public Item item;

        public ItemOnChainData itemOnChainData;

        public ItemData(Item item){
            this.item = item;
            itemOnChainData = new ItemOnChainData(this);
        }
    }
}