namespace ForgottenEmpires.Entities.Skills.Data
{
    public class SkillOnChainData
    {
        public SkillData skillData;

        public uint playerCount;

        public uint fireLevel, waterLevel, airLevel, earthLevel;

        public SkillOnChainData(SkillData skillData) => this.skillData = skillData;
    }
}