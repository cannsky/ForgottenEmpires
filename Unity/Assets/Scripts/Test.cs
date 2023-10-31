using Mirror;
using UnityEngine;

namespace ForgottenEmpires
{
    public class Test : MonoBehaviour
    {
        private void Start()
        {
            NetworkManager.singleton.StartClient();
        }
    }
}
