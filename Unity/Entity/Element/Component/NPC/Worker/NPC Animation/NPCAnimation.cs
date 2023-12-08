using ForgottenEmpires.Entities.Elements.PlayerWorkers;
using ForgottenEmpires.Types;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class NPCAnimation
    {
        private NPCWorker npcWorker;

        // Animator component for npc animations.
        public Animator animator;

        public NPCAnimation(NPCWorker npcWorker)
        {
            this.npcWorker = npcWorker;

            // Get the Animator component from the npc gameobject.
            animator = npcWorker.npc.GetComponent<Animator>();
        }

        // Reset animator parameters
        public void ResetAnimator()
        {

        }

        public void SetAnimation(AnimationType animationType, bool value)
        {
            // Reset animator
            ResetAnimator();

            // Set animation to given value
            animator.SetBool(animationType.ToString(), value);
        }
    }
}