namespace ForgottenEmpires.Managers.Client.Workers
{
    public class ClientUpdateWorker
    {
        public ClientManagerWorker clientManagerWorker;

        public ClientUpdateWorker() => clientManagerWorker = ClientManager.Instance.clientManagerWorker;

        public void OnUpdate()
        {
            //clientManagerWorker.clientMusicWorker.OnUpdate();
        }
    }
}