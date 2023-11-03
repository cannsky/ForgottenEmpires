using ForgottenEmpires.Entity.Elements.NonPlayableCharacters.Workers;
using ForgottenEmpires.Types;

namespace ForgottenEmpires.Entity.Elements.NonPlayableCharacters
{
    public class NonPlayableCharacter : Element
    {
        public NonPlayableCharacterWorker nonPlayableCharacterWorker;

        private void Start()
        {
            nonPlayableCharacterWorker = new NonPlayableCharacterWorker(this);
            nonPlayableCharacterWorker.OnStart();
        }

        public override void SetAnimation(AnimationType animationType, bool value)
        {
            throw new System.NotImplementedException();
        }

        public override void TakeDamage(float damage)
        {
            throw new System.NotImplementedException();
        }


    }
}