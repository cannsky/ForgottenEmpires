using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.NPCs.Workers
{
    public class IronsmithUI
    {
        private IronsmithWorker ironsmithWorker;

        public GameObject ironsmithUIGameObject;

        public IronsmithUI(IronsmithWorker ironsmithWorker)
        {
            this.ironsmithWorker = ironsmithWorker;
            ironsmithUIGameObject = GameObject.Find("Ironsmith Canvas");
        }

        public void ToggleUI() => ironsmithUIGameObject.SetActive(!ironsmithUIGameObject.activeSelf);
    }
}