namespace ForgottenEmpires.Managers.Data.Workers
{
    public class DataManagerWorker
    {
        public PlayerDataWorker playerDataWorker;
        public StartDataWorker startDataWorker;

        public ServerManagerWorker()
        {
            playerDataWorker = new PlayerDataWorker();
            startDataWorker = new StartDataWorker();
        }

        public void OnStart() => serverStartWorker.OnStart();
    }
}