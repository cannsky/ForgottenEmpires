namespace ForgottenEmpires.Entities.Kingdoms.Data
{
    public class KingdomData
    {
        public Kingdom kingdom;

        public KingdomOnChainData kingdomOnChainData;

        public KingdomData(Kingdom kingdom){
            this.kingdom = kingdom;
            kingdomOnChainData = new KingdomOnChainData(this);
        }
    }
}