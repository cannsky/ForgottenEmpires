namespace ForgottenEmpires.Managers.Server.Workers
{
    public class ServerUpdateWorker
    {
        public void OnUpdate()
        {
            ServerDayNightWorker.OnUpdate();
        }
    }
}