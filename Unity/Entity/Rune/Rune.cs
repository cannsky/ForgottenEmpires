using ForgottenEmpires.Types;
using ForgottenEmpires.Managers.JS;
using ForgottenEmpires.Entities.Runes.Data;

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
        public Rune() => runeData = new RuneData(this);

        // Try to upgrade on chain rune
        public void UpdateRune(RuneType runeType) {
            switch (runeType) {
                case RuneType.Fire:
                    JSConnector.Instance.UpgradeFireRune();
                    break;
                case RuneType.Water:
                    JSConnector.Instance.UpgradeWaterRune();
                    break;
                case RuneType.Air:
                    JSConnector.Instance.UpgradeAirRune();
                    break;
                case RuneType.Earth:
                    JSConnector.Instance.UpgradeEarthRune();
                    break;
                default:
                    break;
            }
        }
    }
}