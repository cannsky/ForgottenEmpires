namespace ForgottenEmpires.Manager
{
    public class GameManager
    {
        public static int playerLimit;

        public static GameManager Instance;

        private void Awake() => Instance = this;

        //private void Update() => null;
    }
}