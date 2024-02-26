using ForgottenEmpires.Types;
using System.Collections.Generic;
using ForgottenEmpires.Components.Events;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerEvent
    {
        public PlayerWorker playerWorker;

        public Dictonary<EventType, Event> playerEvents;

        public PlayerEvent(PlayerWorker playerWorker) {
            this.playerWorker = playerWorker;
            playerEvents = new Dictionary<EventType, Event>();
        }

        public void TriggerEvent(EventType eventType) => playerEvents[eventType].HandleEvent();
    }
}