namespace ForgottenEmpires.Entities.Runes.Data
{
    public class RuneOnChainData
    {
        public RuneData runeData;

        public uint playerCount;

        public uint fireLevel, waterLevel, airLevel, earthLevel;

        public RuneOnChainData(RuneData runeData) => this.runeData = runeData;
    }
}