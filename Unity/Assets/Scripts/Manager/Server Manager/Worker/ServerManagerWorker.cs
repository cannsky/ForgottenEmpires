namespace ForgottenEmpires.Managers.Server.Workers
{
    public class ServerManagerWorker
    {
        public ServerEnemyWorker serverEnemyWorker;
        public ServerPlayerWorker serverPlayerWorker;
        public ServerStartWorker serverStartWorker;

        public ServerManagerWorker()
        {
            serverEnemyWorker = new ServerEnemyWorker();
            serverPlayerWorker = new ServerPlayerWorker();
            serverStartWorker = new ServerStartWorker();
        }

        public void OnStart() => serverStartWorker.OnStart();
    }
}