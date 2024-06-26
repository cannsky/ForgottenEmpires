using ForgottenEmpires.Managers.JS;

namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class IronsmithForge
    {
        private IronsmithWorker ironsmithWorker;

        public IronsmithForge(IronsmithWorker ironsmithWorker) => this.ironsmithWorker = ironsmithWorker;

        public void NewItem() => JSConnector.Instance.NewItem();

        public void UpgradeItemDamage(uint itemID) => JSConnector.Instance.UpgradeItemDamage(itemID);

        public void UpgradeItemDefense(uint itemID) => JSConnector.Instance.UpgradeItemDefense(itemID);
    }
}