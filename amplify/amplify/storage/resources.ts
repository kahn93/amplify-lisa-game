// Amplify Storage configuration for handling thousands of players' data

import { Storage } from 'aws-amplify';

// Define the missing type
interface ListOutputItemWithPath {
  key?: string;
  size?: number; // Example of a specific property
  lastModified?: Date; // Example of a specific property
}

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
      if (data) {
        return JSON.parse(data);
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
      await Storage.remove({ key: `players/${playerId}.json` });
      console.log(`Player data for ${playerId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting player data for ${playerId}:`, error);
    }
  }

  // List all players' data
  async listAllPlayers(): Promise<string[]> {
    try {
      const result = await Storage.list({ path: 'players/' });
      if (result.items) {
        return result.items
          .filter((item: ListOutputItemWithPath) => item.key !== undefined)
          .map((item: ListOutputItemWithPath) => item.key || '');
      } else {
        console.error('Unexpected result format from Storage.list:', result);
        return [];
      }
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
