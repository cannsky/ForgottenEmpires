namespace ForgottenEmpires.Components.Effects
{
    public class AttackBonusEffect : Effect
    {
        public override void Apply() => owner.elementWorker.elementStats.UpdateAttackBonus(value);
    }
}