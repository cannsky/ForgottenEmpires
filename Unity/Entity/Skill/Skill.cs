using ForgottenEmpires.Entities.Skills.Data;

namespace ForgottenEmpires.Entities.Skills
{
    public class Skill
    {
        // Skill data
        public SkillData skillData;

        // Skill id
        public uint id;

        // Skill name
        public string name;

        // Create new skill data on skill
        public Skill() => skillData = new SkillData(this);
    }
}