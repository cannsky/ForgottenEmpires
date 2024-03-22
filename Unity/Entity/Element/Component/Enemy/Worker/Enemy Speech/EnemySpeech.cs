using UnityEngine;

namespace ForgottenEmpires.Entities.Elements.Enemies.Workers
{
    public class EnemySpeech
    {
        private EnemyWorker enemyWorker;

        // Radius to check for player
        public float detectionRadius = 5f;
        // The cooldown time in seconds before another enemy can speak again
        public static float speakCooldown = 10f;
        // Static variable to track the last time an enemy spoke
        private static float lastSpeakTime = -10f;

        public List<AudioClip> enemySpeeches;
        public AudioSource enemyAudioSource;

        public EnemySpeech(EnemyWorker enemyWorker) => this.enemyWorker = enemyWorker;

        public void OnStart() => this.enemyAudioSource = enemyWorker.enemy.GetComponent<AudioSource>();

        public void OnUpdate()
        {
            // Check if cooldown has passed
            if (Time.time - lastSpeakTime >= speakCooldown)
            {
                // Check player's proximity
                if (Vector3.Distance(transform.position, Player.instance.transform.position) <= detectionRadius)
                {
                    // Player is within range and cooldown has passed, enemy can speak
                    Speak();
                    // Update last speak time to current time
                    lastSpeakTime = Time.time;
                }
            }
        }

        private void Speak()
        {
            if (enemySpeeches.Count > 0)
            {
                // Select a random clip from the list of speeches
                int clipIndex = Random.Range(0, enemySpeeches.Count);
                AudioClip clipToPlay = enemySpeeches[clipIndex];
                
                // Play the selected clip
                enemyAudioSource.clip = clipToPlay;
                enemyAudioSource.Play();
            }
        }
    }
}