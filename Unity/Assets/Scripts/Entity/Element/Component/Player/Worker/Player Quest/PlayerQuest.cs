using ForgottenEmpires.Components.Quests;
using System.Collections.Generic;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerQuest
    {
        private PlayerWorker playerWorker;

        public List<Quest> quests;

        public PlayerQuest(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        public void AddQuest(Quest quest) => quests.Add(quest);

        public void RemoveQuest(Quest quest) => quests.Remove(quest);

        public void CheckQuests()
        {
            foreach (Quest quest in quests) if (quest.CheckQuestGoal()) quest.GiveReward();
        }
    }
}