using UnityEngine;
using ForgottenEmpires.Components.Quests.Goals;
using ForgottenEmpires.Components.Quests.Rewards;
using ForgottenEmpires.Entities.Elements;

namespace ForgottenEmpires.Components.Quests
{
    public class Quest : ScriptableObject
    {
        // Owner element
        public Player owner;

        // Quest Goal
        public QuestGoal questGoal;

        // Quest Reward
        public QuestReward questReward;

        // Setup Quest
        public void Setup()
        {
            // Check if quest goal or quest reward is equal to null
            if (questGoal == null || questReward == null) return;
            
            // Setup quest goal
            questGoal.Setup(this);

            // Setup quest reward
            questReward.Setup(this);
        }

        // Check Quest Goal
        public virtual bool CheckQuestGoal() => questGoal.Check();

        // Give Quest Reward
        public virtual void GiveReward() => questReward.GiveReward();
    }
}