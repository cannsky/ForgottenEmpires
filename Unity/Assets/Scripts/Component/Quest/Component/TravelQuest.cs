using UnityEngine;

namespace ForgottenEmpires.Components.Quests
{
    public class TravelQuest : Quest
    {
        public Vector3 position;

        public override bool CheckQuestGoal() => (owner.transform.position != position);

        public override void GiveReward() => owner.playerWorker.playerStats.xp += xpReward;
    }
}