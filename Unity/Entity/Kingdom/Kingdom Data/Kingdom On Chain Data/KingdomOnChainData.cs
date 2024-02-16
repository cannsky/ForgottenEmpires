namespace ForgottenEmpires.Entities.Kingdoms.Data
{
    public class KingdomOnChainData
    {
        public KingdomData kingdomData;

        public uint playerCount;

        public KingdomOnChainData(KingdomData kingdomData) => this.kingdomData = kingdomData;
    }
}