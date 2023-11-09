namespace ForgottenEmpires.Entities.Elements.NonPlayableCharacters.Workers
{
    public class NonPlayableCharacterWorker
    {
        public NonPlayableCharacter nonPlayableCharacter;

        public NonPlayableCharacterStart nonPlayableCharacterStart;

        public NonPlayableCharacterAnimator nonPlayableCharacterAnimator;

        public NonPlayableCharacterWorker(NonPlayableCharacter nonPlayableCharacter)
        {
            this.nonPlayableCharacter = nonPlayableCharacter;

            nonPlayableCharacterStart = new NonPlayableCharacterStart(this);

            nonPlayableCharacterAnimator = new NonPlayableCharacterAnimator(this);
        }

        public void OnStart() => nonPlayableCharacterStart.OnStart();
    }
}