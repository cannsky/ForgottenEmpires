using Mirror;
using System.Linq;

namespace ForgottenEmpires.Managers.Data.Workers
{
    public class StartDataWorker
    {
        public void OnStart()
        {
            PlayerDataWorker.OnStart();
        }
    }
}