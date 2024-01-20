namespace ForgottenEmpires.Managers.Server.Workers
{
    public class ServerManagerWorker
    {
        public ServerStartWorker serverStartWorker;
        public ServerUpdateWorker serverUpdateWorker;

        public ServerDayNightWorker serverDayNightWorker;
        public ServerEnemyWorker serverEnemyWorker;
        public ServerKingdomWorker serverKingdomWorker;
        public ServerObjectPoolWorker serverObjectPoolWorker;
        public ServerPlayerWorker serverPlayerWorker;

        public ServerManagerWorker()
        {
            serverStartWorker = new ServerStartWorker();
            serverUpdateWorker = new ServerUpdateWorker();

            serverDayNightWorker = new ServerDayNightWorker();
            serverEnemyWorker = new ServerEnemyWorker();
            serverKingdomWorker = new ServerKingdomWorker();
            serverObjectPoolWorker = new ServerObjectPoolWorker();
            serverPlayerWorker = new ServerPlayerWorker();
        }

        public void OnStart() => serverStartWorker.OnStart();
    }
}