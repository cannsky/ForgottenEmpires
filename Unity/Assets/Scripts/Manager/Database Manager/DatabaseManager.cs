using UnityEngine;
using Mono.Data.Sqlite;
using System.Data;

public class DatabaseManager : MonoBehaviour
{
    private IDbConnection dbConnection;

    private void Awake()
    {
        string connectionString = "URI=file:" + Application.persistentDataPath + "/GameDatabase.db";
        dbConnection = new SqliteConnection(connectionString);
        dbConnection.Open();

        CreateTablesIfNeeded();
    }

    private void CreateTablesIfNeeded()
    {
        IDbCommand dbCmd = dbConnection.CreateCommand();
        dbCmd.CommandText = "CREATE TABLE IF NOT EXISTS players (id INTEGER PRIMARY KEY AUTOINCREMENT, wallet_address TEXT NOT NULL);";
        dbCmd.ExecuteNonQuery();

        dbCmd.CommandText = "CREATE TABLE IF NOT EXISTS player_inventory (id INTEGER PRIMARY KEY AUTOINCREMENT, player_id INTEGER, item_name TEXT NOT NULL, is_used INTEGER NOT NULL DEFAULT 0, FOREIGN KEY(player_id) REFERENCES players(id));";
        dbCmd.ExecuteNonQuery();

        dbCmd.Dispose();
    }

    public void AddNewPlayer(string walletAddress)
    {
        using (IDbCommand dbCmd = dbConnection.CreateCommand())
        {
            dbCmd.CommandText = "INSERT INTO players (wallet_address) VALUES (@walletAddress)";
            dbCmd.Parameters.Add(new SqliteParameter("@walletAddress", walletAddress));

            dbCmd.ExecuteNonQuery();
        }
    }

    public void AddItemToInventory(int playerId, string itemName)
    {
        using (IDbCommand dbCmd = dbConnection.CreateCommand())
        {
            dbCmd.CommandText = "INSERT INTO player_inventory (player_id, item_name) VALUES (@playerId, @itemName)";
            dbCmd.Parameters.Add(new SqliteParameter("@playerId", playerId));
            dbCmd.Parameters.Add(new SqliteParameter("@itemName", itemName));

            dbCmd.ExecuteNonQuery();
        }
    }

    public void UpdateItemUsage(int inventoryItemId)
    {
        using (IDbCommand dbCmd = dbConnection.CreateCommand())
        {
            dbCmd.CommandText = "UPDATE player_inventory SET is_used = 1 WHERE id = @inventoryItemId";
            dbCmd.Parameters.Add(new SqliteParameter("@inventoryItemId", inventoryItemId));

            dbCmd.ExecuteNonQuery();
        }
    }

    private void OnDisable()
    {
        if (dbConnection != null)
        {
            dbConnection.Close();
            dbConnection = null;
        }
    }
}