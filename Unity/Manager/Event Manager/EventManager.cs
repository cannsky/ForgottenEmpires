using UnityEngine;
using ForgottenEmpires.Managers.Event.Workers;

namespace ForgottenEmpires.Managers.Event
{
    public class EventManager : MonoBehaviour
    {
        public static EventManager Instance;

        public EventManagerWorker eventManagerWorker;

        private void Awake()
        {
            DontDestroyOnLoad(Instance = this);
            eventManagerWorker = new EventManagerWorker();
        }

        private void Start() => eventManagerWorker.OnStart();

        private void Update() { }
    }
}