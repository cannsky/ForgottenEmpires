using UnityEngine.SceneManagement;

namespace ForgottenEmpires.Managers.Client.Workers
{
    public class ClientUIWorker
    {
        public void ChangeWelcomeScreen() => SceneManager.LoadScene(1);
    }
}