using ForgottenEmpires.Components.Effects;
using ForgottenEmpires.Entities.Elements;
using ForgottenEmpires.Managers.Server;
using ForgottenEmpires.Entities.Items.Data;
using System.Collections;
using UnityEngine;

namespace ForgottenEmpires.Entities.Items
{
    public abstract class Item : ScriptableObject
    {
        // Effect of the item
        public Effect effect;

        // Cooldown time for item usage
        public float cooldown;

        // Is item in cooldown
        public bool isCooldown;

        // Data of the item
        public ItemData itemData;

        public void Awake() => itemData = new ItemData(this);

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