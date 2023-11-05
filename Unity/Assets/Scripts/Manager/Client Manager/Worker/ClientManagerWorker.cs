namespace ForgottenEmpires.Managers.Client.Workers
{
    public class ClientManagerWorker
    {
        public ClientStartWorker clientStartWorker;

        public ClientMusicWorker clientMusicWorker;

        public void OnStart() => clientStartWorker.OnStart();
    }
}