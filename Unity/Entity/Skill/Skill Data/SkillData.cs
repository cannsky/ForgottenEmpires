namespace ForgottenEmpires.Entities.Skills.Data
{
    public class SkillData
    {
        public Skill skill;

        public SkillOnChainData skillOnChainData;

        public SkillData(Skill Skill){
            this.skill = skill;
            skillOnChainData = new SkillOnChainData(this);
        }
    }
}