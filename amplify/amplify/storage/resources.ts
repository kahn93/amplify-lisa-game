// Amplify Storage configuration for handling thousands of players' data

import { Storage } from '@aws-amplify/storage';

export class StorageManager {
  // Save player data to storage
  async savePlayerData(playerId: string, data: Record<string, unknown>): Promise<void> {
    try {
      await Storage.put(`players/${playerId}.json`, JSON.stringify(data), {
        contentType: 'application/json',
      });
      console.log(`Player data for ${playerId} saved successfully.`);
    } catch (error) {
      console.error(`Error saving player data for ${playerId}:`, error);
    }
  }

  // Load player data from storage
  async loadPlayerData(playerId: string): Promise<Record<string, unknown> | null> {
    try {
      const data = await Storage.get(`players/${playerId}.json`, { download: true });
      if (data && data.Body) {
        const text = await data.Body.text();
        return JSON.parse(text);
      }
      console.log(`No data found for player ${playerId}.`);
      return null;
    } catch (error) {
      console.error(`Error loading player data for ${playerId}:`, error);
      return null;
    }
  }

  // Delete player data from storage
  async deletePlayerData(playerId: string): Promise<void> {
    try {
      await Storage.remove(`players/${playerId}.json`);
      console.log(`Player data for ${playerId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting player data for ${playerId}:`, error);
    }
  }

  // List all players' data
  async listAllPlayers(): Promise<string[]> {
    try {
      const result = await Storage.list('players/');
      return result.map((item: { key: string; }) => item.key);
    } catch (error) {
      console.error('Error listing all players:', error);
      return [];
    }
  }

  // Adjust player coin balance
  async adjustPlayerCoins(playerId: string, adjustment: number): Promise<void> {
    try {
      const playerData = await this.loadPlayerData(playerId);
      if (playerData) {
        const currentCoins = typeof playerData.coins === 'number' ? playerData.coins : 0;
        playerData.coins = currentCoins + adjustment;
        await this.savePlayerData(playerId, playerData);
        console.log(`Player ${playerId} coin balance adjusted by ${adjustment}. New balance: ${playerData.coins}`);
      } else {
        console.log(`Player ${playerId} data not found. Creating new record.`);
        await this.savePlayerData(playerId, { coins: adjustment });
      }
    } catch (error) {
      console.error(`Error adjusting coin balance for player ${playerId}:`, error);
    }
  }
}
