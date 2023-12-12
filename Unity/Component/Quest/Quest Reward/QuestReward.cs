using UnityEngine;

namespace ForgottenEmpires.Components.Quests.Rewards
{
    public class QuestReward : ScriptableObject
    {
        // Quest of the quest reward
        public Quest quest;

        // Set quest of the quest reward
        public void Setup(Quest quest) => this.quest = quest;

        public virtual void GiveReward() { }
    }
}