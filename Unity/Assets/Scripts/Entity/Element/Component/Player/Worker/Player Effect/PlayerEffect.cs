using ForgottenEmpires.Components.Effects;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerEffect
    {
        private PlayerWorker playerWorker;

        // Player's current effects
        public List<Effect> effects;

        public PlayerEffect(PlayerWorker playerWorker) => this.playerWorker = playerWorker;

        public void OnUpdate() => ApplyEffects();

        // Apply effects to the player stats
        public void ApplyEffects()
        {
            foreach(Effect effect in effects)
            {
                
            }
        }

        public void AddEffect(Effect effect)
        {
            // Add effect to the effects
            effects.Add(effect);

            // Start remove effect coroutine for removing the effect when the time of the effect ends
            playerWorker.player.StartCoroutine(RemoveEffect(effect));
        }

        public IEnumerator RemoveEffect(Effect effect)
        {
            // Wait until effect's time is completed
            yield return new WaitForSeconds(effect.time);
            
            // Remove effect from player effects
            effects.Remove(effect);
        }
    }
}