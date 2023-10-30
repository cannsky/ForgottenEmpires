using ForgottenEmpires.Manager.Client.Music;

namespace ForgottenEmpires.Manager.Worker
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
