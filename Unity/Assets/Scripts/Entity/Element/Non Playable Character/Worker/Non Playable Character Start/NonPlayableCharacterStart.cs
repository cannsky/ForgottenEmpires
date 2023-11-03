namespace ForgottenEmpires.Entity.Elements.NonPlayableCharacters.Workers
{
    public class NonPlayableCharacterStart
    {
        public NonPlayableCharacterWorker nonPlayableCharacterWorker;

        public NonPlayableCharacterStart(NonPlayableCharacterWorker nonPlayableCharacterWorker) => this.nonPlayableCharacterWorker = nonPlayableCharacterWorker;

        public void OnStart()
        {
            if (nonPlayableCharacterWorker.nonPlayableCharacter.isClient) OnClientStart();
            if (nonPlayableCharacterWorker.nonPlayableCharacter.isServer) OnServerStart();
        }

        public void OnClientStart() { }

        public void OnServerStart() { }
    }
}