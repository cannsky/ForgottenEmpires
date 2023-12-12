using UnityEngine;

namespace ForgottenEmpires.Components.Quests.Goals
{
    public class QuestGoal : ScriptableObject
    {
        // Quest of the quest goal
        public Quest quest;

        // Set quest of the quest goal
        public void Setup(Quest quest) => this.quest = quest;

        // Check quest
        public virtual bool Check() => false;
    }
}