using ForgottenEmpires.Types;
using System.Collections.Generic;
using ForgottenEmpires.Components.Events;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerDeath
    {
        public PlayerWorker playerWorker;

        public PlayerRotation(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        public void OnDeath() => playerWorker.playerEvent.TriggerEvent(EventType.DeathEvent);
    }
}