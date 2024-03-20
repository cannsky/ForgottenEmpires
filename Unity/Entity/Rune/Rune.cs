namespace ForgottenEmpires.Entities.Runes
{
    public class Rune
    {
        // Rune data
        public RuneData runeData;

        // Rune id
        public uint id;

        // Rune name
        public string name;

        // Create new rune data on rune
        public Rune() => runeData = new RuneData();
    }
}