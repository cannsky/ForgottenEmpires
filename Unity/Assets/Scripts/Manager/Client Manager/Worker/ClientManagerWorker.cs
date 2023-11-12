namespace ForgottenEmpires.Managers.Client.Workers
{
    public class ClientManagerWorker
    {
        public ClientStartWorker clientStartWorker;
        public ClientUpdateWorker clientUpdateWorker;

        public ClientDataWorker clientDataWorker;
        public ClientLoginWorker clientLoginWorker;
        public ClientMusicWorker clientMusicWorker;

        public ClientManagerWorker()
        {
            clientStartWorker = new ClientStartWorker();
            clientUpdateWorker = new ClientUpdateWorker();

            clientDataWorker = new ClientDataWorker();
            clientLoginWorker = new ClientLoginWorker();
            clientMusicWorker = new ClientMusicWorker();
        }

        public void OnStart() => clientStartWorker.OnStart();

        public void OnUpdate() => clientUpdateWorker.OnUpdate();
    }
}