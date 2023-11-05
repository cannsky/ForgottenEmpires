namespace ForgottenEmpires.Managers.Server.Workers
{
    public class ServerManagerWorker
    {
        public ServerPlayerWorker serverPlayerWorker;
        public ServerStartWorker serverStartWorker;

        public ServerManagerWorker()
        {
            serverPlayerWorker = new ServerPlayerWorker();
            serverStartWorker = new ServerStartWorker();
        }

        public void OnStart() => serverStartWorker.OnStart();
    }
}