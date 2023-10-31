using Mirror;
using UnityEngine;

namespace ForgottenEmpires
{
    public class Test : MonoBehaviour
    {
        private void Awake()
        {
            NetworkManager.singleton.StartHost();
        }
    }
}
