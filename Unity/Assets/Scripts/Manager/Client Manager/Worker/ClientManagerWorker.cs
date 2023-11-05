namespace ForgottenEmpires.Managers.Client.Workers
{
    public class ClientManagerWorker
    {
        public ClientStartWorker clientStartWorker;
        public ClientUpdateWorker clientUpdateWorker;

        public ClientMusicWorker clientMusicWorker;

        public void OnStart() => clientStartWorker.OnStart();

        public void OnUpdate() => clientUpdateWorker.OnUpdate();
    }
}