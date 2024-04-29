using System.Collections;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.Workers
{
    public class ElementStats
    {
        private ElementWorker elementWorker;

        private float health, totalHealth;
        private float attackDamage, attackDamageBonus;
        private float armor, armorBonus;

        public ElementStats(ElementWorker elementWorker) => this.elementWorker = elementWorker;

        // Change element health value
        public void UpdateHealth(float value)
        {
            // If increased health value is greater than total health, health should be total health
            // If decreased health value is lower than or equal to 0, element death event will be triggered.
            if (value > 0 && (health += value) > totalHealth) health = totalHealth;
            else if ((health += value) <= 0) elementWorker.elementEvent.DeathEvent();
        }

        public void UpdateAttackBonus(float value, float cooldown)
        {
            attackDamageBonus += value;
            elementWorker.element.StartCoroutine(ResetAttackBonus(cooldown));
        }

        public IEnumerator ResetAttackBonus(float cooldown)
        {
            yield return new WaitForSeconds(cooldown);
            attackDamageBonus = 0;
        }

        public void UpdateDefenseBonus(float value, float cooldown)
        {
            armorBonus += value;
            elementWorker.element.StartCoroutine(ResetDefenseBonus(float cooldown));
        }

        public IEnumerator ResetDefenseBonus(float cooldown)
        {
            yield return new WaitForSeconds(cooldown);
            armorBonus = 0;
        }
    }
}