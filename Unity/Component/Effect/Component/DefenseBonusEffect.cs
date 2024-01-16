namespace ForgottenEmpires.Components.Effects
{
    public class DefenseBonusEffect : Effect
    {
        public override void Apply() => owner.elementWorker.elementStats.UpdateDefenseBonus(value);
    }
}