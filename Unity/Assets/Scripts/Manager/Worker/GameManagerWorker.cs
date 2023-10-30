using ForgottenEmpires.Manager.Workers;

namespace ForgottenEmpires.Manager
{
    public class GameManagerWorker
    {
        public MusicManagerWorker musicManagerWorker;
        public PlayerManagerWorker playerManagerWorker;

        public GameManagerWorker()
        {
            musicManagerWorker = new MusicManagerWorker();
            playerManagerWorker = new PlayerManagerWorker();
        }
    }
}
