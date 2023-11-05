using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ForgottenEmpires.Managers.Client.Workers
{
    public class ClientMusicWorker
    {
        private AudioSource audioSource;
        private List<AudioClip> currentAudioList, mainMusicList, travelMusicList, battleMusicList;
        private MusicType musicType;

        private bool isMusicChanging;
        private MusicType latestRequestedMusicType;

        public void OnStart() => ChangeMusic();

        public void OnUpdate ()
        {
            if (!audioSource.isPlaying) ChangeMusic();
        }

        private void UpdateMusicType(MusicType musicType)
        {
            this.musicType = musicType;
            currentAudioList = GetAudioList();
        }

        public void ChangeMusicType(MusicType musicType)
        {
            if (isMusicChanging)
            {
                latestRequestedMusicType = musicType;
                return;
            }
            UpdateMusicType(musicType);
            ClientManager.Instance.StartCoroutine(ChangeMusic());
        }

        private IEnumerator ChangeMusic()
        {
            isMusicChanging = true;

            if (!audioSource.isPlaying) audioSource.volume = 0;

            if (latestRequestedMusicType != musicType) UpdateMusicType(musicType);

            while (audioSource.volume > 0f)
            {
                audioSource.volume -= 0.2f * Time.deltaTime;
                yield return null;
            }

            audioSource.Stop();
            audioSource.clip = currentAudioList[Random.Range(0, currentAudioList.Count)];
            audioSource.Play();

            while (audioSource.volume < 1f)
            {
                audioSource.volume += 0.2f * Time.deltaTime;
                yield return null;
            }

            isMusicChanging = false;
        }
        
        private List<AudioClip> GetAudioList() => musicType switch
        {
            MusicType.Main => mainMusicList,
            MusicType.Travel => travelMusicList,
            MusicType.Battle => battleMusicList,
            _ => mainMusicList
        };
    }
}