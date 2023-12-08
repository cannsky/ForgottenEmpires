using ForgottenEmpires.Entities.Elements;

namespace ForgottenEmpires.Components.Quests
{
    public abstract class Quest
    {
        // Owner element
        public Player owner;

        // Rewards
        public int xpReward;

        public abstract bool CheckQuestGoal();

        public abstract void GiveReward();
    }
}