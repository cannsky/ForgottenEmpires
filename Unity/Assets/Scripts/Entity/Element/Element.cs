using UnityEngine;

namespace ForgottenEmpires.Entity.Elements
{
    public abstract class Element : MonoBehaviour
    {
        //These are network variables, needs to be updated continously and shown to the other players.
        public float health, totalHealth;

        public abstract void TakeDamage(float damage);
    }
}