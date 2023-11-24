using ForgottenEmpires.Entities.Elements;

namespace ForgottenEmpires.Components.Quests
{
    public abstract class Quest
    {
        public Element owner;

        public abstract bool CheckQuestGoal();
    }
}