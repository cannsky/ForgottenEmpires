using System;
using System.Collections.Generic;
using UnityEngine;

namespace ForgottenEmpires.Managers.Quest
{
    public class QuestManager : MonoBehaviour
    {
        public static QuestManager Instance;

        public List<Quest> quests;

        void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
                DontDestroyOnLoad(gameObject);
            }
            else
            {
                Destroy(gameObject);
            }
        }

        public void AddQuestProgress(string questName, int amount)
        {
            foreach (var quest in quests)
            {
                if (quest.questName == questName && !quest.isComplete)
                {
                    quest.AddProgress(amount);
                    break;
                }
            }
        }
    }

    [Serializable]
    public class Quest
    {
        public string questName;
        public string description;
        public bool isComplete;
        public int requiredAmount;
        public int currentAmount;

        public void CheckIfComplete()
        {
            if (currentAmount >= requiredAmount)
            {
                isComplete = true;
                Debug.Log(questName + " is completed!");
            }
        }

        public void AddProgress(int amount)
        {
            currentAmount += amount;
            CheckIfComplete();
        }
    }
}