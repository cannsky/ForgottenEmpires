using ForgottenEmpires.Entities.Kingdoms.Data;

namespace ForgottenEmpires.Entities.Kingdoms
{
    public class Kingdom
    {
        // Kingdom data
        public KingdomData kingdomData;

        // Kingdom id
        public uint id;

        // Kingdom name
        public string name;

        // Create new kingdom data on kingdom
        public Kingdom() => kingdomData = new KingdomData(this);
    }
}