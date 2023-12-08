using ForgottenEmpires.Components.Effects;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.Workers
{
    public class ElementEffect
    {
        private ElementWorker elementWorker;

        // Player's current effects
        public List<Effect> effects;

        public ElementEffect(ElementWorker elementWorker) => this.elementWorker = elementWorker;

        public void OnUpdate() => ApplyEffects();

        // Apply effects to the player stats
        public void ApplyEffects()
        {
            // Apply each effect in the update
            foreach (Effect effect in effects) effect.Apply();
        }

        public void AddEffect(Effect effect)
        {
            // If effect is null return
            if (effect == null) return;

            // Add effect to the effects
            effects.Add(effect);

            // Start remove effect coroutine for removing the effect when the time of the effect ends
            elementWorker.element.StartCoroutine(RemoveEffect(effect));
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