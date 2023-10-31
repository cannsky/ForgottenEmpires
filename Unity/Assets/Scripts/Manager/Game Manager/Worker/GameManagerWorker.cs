using ForgottenEmpires.Managers.Game.Workers;

namespace ForgottenEmpires.Managers.Game
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
