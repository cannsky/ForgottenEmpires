using System;
using System.Collections.Generic;

namespace ForgottenEmpires.Entities.Elements.PlayerWorkers
{
    public class PlayerState
    {
        private PlayerWorker playerWorker;

        // Reset actions to be triggered when the state is changed
        public Dictionary<StateType, List<Action>> resetActions;

        // Current state
        public StateType state;

        public PlayerState(PlayerWorker playerWorker)
        {
            this.playerWorker = playerWorker;

            // Set default state
            state = StateType.Idle;

            // Create reset actions for each state type
            resetActions = new Dictionary<StateType, List<Action>>()
            {
                { StateType.Idle, new List<Action>() },
                { StateType.Moving, new List<Action>() },
                { StateType.Attacking, new List<Action>() }
            };
        }

        // Add a new reset action
        public void AddResetAction(StateType state, Action resetAction) => resetActions[state].Add(resetAction);

        // Check the state
        public bool CheckState(StateType state) => this.state == state;

        // Reset state to the default state
        public void ResetState() => state = StateType.Idle;

        // Trigger old state's reset actions and set new state
        public void SetState(StateType state)
        {
            foreach (var action in resetActions[this.state]) action();
            this.state = state;
        }
    }
}