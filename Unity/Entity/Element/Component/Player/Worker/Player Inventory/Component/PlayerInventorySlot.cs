using ForgottenEmpires.Components.Effects;
using ForgottenEmpires.Entities.Items;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerInventorySlot
    {
        public Item item;

        public Effect Use() => item.GetEffect();
    }
}