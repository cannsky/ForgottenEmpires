using UnityEngine;

namespace ForgottenEmpires.Components.Quests.Goals
{
    public class QuestGoal : ScriptableObject
    {
        public Quest quest;

        public void Setup(Quest quest) => this.quest = quest;

        public virtual bool Check() => false;
    }
}