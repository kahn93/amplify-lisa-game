// Save and Load Manager for the click mining game

import { databaseSchema } from '../../amplify/backend/databaseSchema';

export class SaveLoadManager {
  private storageKey = 'clickMiningGameSave';

  // Save game data to local storage
  saveGame(data: typeof databaseSchema['users']): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      console.log('Game saved successfully.');
    } catch (error) {
      console.error('Error saving game:', error);
    }
  }

  // Load game data from local storage
  loadGame(): typeof databaseSchema['users'] | null {
    try {
      const savedData = localStorage.getItem(this.storageKey);
      if (savedData) {
        console.log('Game loaded successfully.');
        return JSON.parse(savedData);
      }
      console.log('No saved game found.');
      return null;
    } catch (error) {
      console.error('Error loading game:', error);
      return null;
    }
  }
}
