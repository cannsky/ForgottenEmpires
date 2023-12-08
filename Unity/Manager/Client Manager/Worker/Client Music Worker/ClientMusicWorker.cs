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

        // Update the current music type.
        private void UpdateMusicType(MusicType musicType)
        {
            this.musicType = musicType;
            currentAudioList = GetAudioList();
        }

        // Change the music type.
        public void ChangeMusicType(MusicType musicType)
        {
            // Check if music change is in progress and store the requested type.
            if (isMusicChanging)
            {
                latestRequestedMusicType = musicType;
                return;
            }
            UpdateMusicType(musicType);
            ClientManager.Instance.StartCoroutine(ChangeMusic());
        }

        // Coroutine to change the music.
        private IEnumerator ChangeMusic()
        {
            isMusicChanging = true;

            // Fade out the music by reducing the volume.
            if (!audioSource.isPlaying) audioSource.volume = 0;
            if (latestRequestedMusicType != musicType) UpdateMusicType(musicType);
            while (audioSource.volume > 0f)
            {
                audioSource.volume -= 0.2f * Time.deltaTime;
                yield return null;
            }
            audioSource.Stop();

            // Select a random audio clip from the current list and play it.
            audioSource.clip = currentAudioList[Random.Range(0, currentAudioList.Count)];

            // Fade in the music by increasing the volume.
            audioSource.Play();
            while (audioSource.volume < 1f)
            {
                audioSource.volume += 0.2f * Time.deltaTime;
                yield return null;
            }
            isMusicChanging = false;
        }

        // Get the appropriate audio list based on the music type.
        private List<AudioClip> GetAudioList() => musicType switch
        {
            MusicType.Main => mainMusicList,
            MusicType.Travel => travelMusicList,
            MusicType.Battle => battleMusicList,
            _ => mainMusicList
        };
    }
}