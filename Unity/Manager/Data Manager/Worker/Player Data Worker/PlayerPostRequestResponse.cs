namespace ForgottenEmpires.Managers.Data.Workers {
    public class Variable { public string value { get; set; } }

    public class PlayerStatsRuntime { public PlayerStats playerStats { get; set; } }

    public class PlayerRuntime { public Player players { get; set; } }

    public class PlayerStatsData { public PlayerStatsRuntime runtime { get; set; } }

    public class PlayerData { public PlayerRuntime runtime { get; set; } }

    public class PlayerStatsResponse { public PlayerStatsData data { get; set; } }

    public class PlayerResponse { public PlayerData data { get; set; } }

    public class Player {
        public string level;
        public string xp;
    }

    public class PlayerStats {
        public Variable bravery { get; set; }
        public Variable charisma { get; set; }
        public Variable leadership { get; set; }
        public Variable reputation { get; set; }
        public Variable maxupgrade { get; set; }
    }
}