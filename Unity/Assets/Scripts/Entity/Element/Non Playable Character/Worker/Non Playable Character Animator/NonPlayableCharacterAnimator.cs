using System.Collections;
using UnityEngine;

namespace ForgottenEmpires.Entity.Elements.NonPlayableCharacters.Workers
{
    public class NonPlayableCharacterAnimator
    {
        private NonPlayableCharacterWorker nonPlayableCharacterWorker;

        private Animator animator;

        public NonPlayableCharacterAnimator(NonPlayableCharacterWorker nonPlayableCharacterWorker)
        {
            this.nonPlayableCharacterWorker = nonPlayableCharacterWorker;
            animator = nonPlayableCharacterWorker.nonPlayableCharacter.GetComponent<Animator>();
        }

        public void OnStart() => nonPlayableCharacterWorker.nonPlayableCharacter.StartCoroutine(StartAnimationAtRandomSecond());

        public IEnumerator StartAnimationAtRandomSecond()
        {
            yield return new WaitForSeconds(Random.Range(0f, 1f));
            animator.SetBool("Idle", true);
        }
    }
}