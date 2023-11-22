using ForgottenEmpires.Components.Effects;
using ForgottenEmpires.Entities.Elements;
using ForgottenEmpires.Managers.Server;
using System.Collections;
using UnityEngine;
using static UnityEditor.Progress;

namespace ForgottenEmpires.Entities.Items
{
    public abstract class Item
    {
        // Effect of the item
        public Effect effect;

        // Cooldown time for item usage
        public float cooldown;

        // Is item in cooldown
        public bool isCooldown;

        public virtual Effect GetEffect()
        {
            // If is in cooldown return null
            if (isCooldown) return null;

            // Start coroutine to reset cooldown
            ServerManager.Instance.StartCoroutine(ResetCooldown());

            // Return the effect of the item
            return effect;
        }

        public virtual IEnumerator ResetCooldown()
        {
            // Set is cooldown to true
            isCooldown = true;

            // Wait for the cooldown time
            yield return new WaitForSeconds(cooldown);

            // Set is cooldown to false
            isCooldown = false;
        }
    }
}