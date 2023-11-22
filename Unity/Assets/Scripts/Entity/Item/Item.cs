using ForgottenEmpires.Components.Effects;
using ForgottenEmpires.Entities.Elements;
using System.Collections;
using UnityEngine;
using static UnityEditor.Progress;

namespace ForgottenEmpires.Entities.Items
{
    public abstract class Item
    {
        // Owner of the item
        public Element owner;

        // Effect of the item
        public Effect effect;

        // Cooldown time for item usage
        public float cooldown;

        // Is item in cooldown
        public bool isCooldown;

        public virtual Effect GetEffect()
        {
            if (isCooldown) return null;
            ResetCooldown();
            return effect;
        }

        public virtual IEnumerator ResetCooldown()
        {
            isCooldown = true;
            yield return new WaitForSeconds(cooldown);
            isCooldown = false;
        }
    }
}