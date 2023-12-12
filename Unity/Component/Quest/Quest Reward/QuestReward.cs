using UnityEngine;

namespace ForgottenEmpires.Components.Quests.Rewards
{
    public class QuestReward : ScriptableObject
    {
        public Quest quest;

        public void Setup(Quest quest) => this.quest = quest;

        public virtual void GiveReward() { }
    }
}