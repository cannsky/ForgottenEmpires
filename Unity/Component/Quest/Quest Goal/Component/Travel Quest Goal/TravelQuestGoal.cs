using UnityEngine;

namespace ForgottenEmpires.Components.Quests.Goals
{
    public class TravelQuestGoal : QuestGoal
    {
        // Target position of the quest goal
        public Vector3 targetPosition;

        // Return true if player position's distance with target position is lower than or equal to 1f
        public override bool Check() => Vector3.Distance(quest.owner.transform.position, targetPosition) <= 1f;
    }
}