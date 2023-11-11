namespace ForgottenEmpires.Managers.Client.Workers
{
    public class ClientStartWorker
    {
        public ClientManagerWorker clientManagerWorker;

        public ClientStartWorker() => clientManagerWorker = ClientManager.Instance.clientManagerWorker;

        public void OnStart()
        {
            //clientManagerWorker.clientMusicWorker.OnStart();
        }
    }
}