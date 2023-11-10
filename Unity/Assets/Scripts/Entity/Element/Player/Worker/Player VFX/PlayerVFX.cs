using ForgottenEmpires.Types;
using System.Collections.Generic;
using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerVFX
    {
        private PlayerWorker playerWorker;

        public Dictionary<VFXType, GameObject> vfxs = new Dictionary<VFXType, GameObject>();

        public PlayerVFX(PlayerWorker playerWorker)
        {
            this.playerWorker = playerWorker;

            vfxs.Add(VFXType.Heal, playerWorker.player.transform.GetChild(1).GetChild(0).gameObject);
        }

        public void PlayVFX(VFXType vfxType) => vfxs[vfxType].SetActive(true);

        public void StopVFX(VFXType vfxType) => vfxs[vfxType].SetActive(false);
    }
}