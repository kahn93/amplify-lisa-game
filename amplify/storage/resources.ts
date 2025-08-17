// Amplify Storage configuration for handling thousands of players' data

import { Amplify } from '@aws-amplify/core';
import { downloadData, DownloadDataInput, list, ListAllWithPathInput, remove, RemoveWithPathInput, uploadData, UploadDataWithPathInput } from '@aws-amplify/storage';
import awsconfig from '../../aws-exports'; // Adjust the path as necessary

Amplify.configure(awsconfig);

export class StorageManager {
  // Save player data to storage
  async savePlayerData(playerId: string, data: Record<string, unknown>): Promise<void> {
    try {
      const input: UploadDataWithPathInput = {
        path: `players/${playerId}.json`,
        file: new Blob([JSON.stringify(data)], { type: 'application/json' }),
        contentType: 'application/json',
      };
      await uploadData(input);
      console.log(`Player data for ${playerId} saved successfully.`);
    } catch (error) {
      console.error(`Error saving player data for ${playerId}:`, error);
    }
  }

  // Load player data from storage
  async loadPlayerData(playerId: string): Promise<Record<string, unknown> | null> {
    try {
      const input: DownloadDataInput = {
        key: `players/${playerId}.json`,
      };
      const data = await downloadData(input);
      if (data && 'Body' in data) {
        const jsonData = await (data.Body as Blob).text();
        return JSON.parse(jsonData);
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
      const input: RemoveWithPathInput = {
        path: `players/${playerId}.json`,
      };
      await remove(input);
      console.log(`Player data for ${playerId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting player data for ${playerId}:`, error);
    }
  }

  // List all players' data
  async listAllPlayers(): Promise<string[]> {
    try {
      const input: ListAllWithPathInput = {
        path: 'players/',
      };
      const result = await list(input);
      if (result.items) {
        return (result.items as { key?: string; }[])
          .filter((item) => 'key' in item && item.key !== undefined)
          .map((item) => item.key || '');
      } else {
        console.error('Unexpected result format from list:', result);
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
