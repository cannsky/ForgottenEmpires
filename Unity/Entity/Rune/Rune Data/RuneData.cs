namespace ForgottenEmpires.Entities.Runes.Data
{
    public class RuneData
    {
        public Rune rune;

        public RuneOnChainData runeOnChainData;

        public RuneData(Rune rune){
            this.rune = rune;
            runeOnChainData = new RuneOnChainData(this);
        }
    }
}