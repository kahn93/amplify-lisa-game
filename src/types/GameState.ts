export interface GameState {
  achievements: {
    unlocked: string[]; // List of unlocked achievement IDs
    totalUnlocked: number; // Total number of unlocked achievements
    progress?: { [achievementId: string]: number; }; // Progress towards specific achievements
  };
  lastSavedTimestamp: number; // Timestamp of the last save
  playerStats: {
    coins: number; // Total coins earned by the player
    level: number; // Current level of the player
    experience: number; // Experience points of the player
    energy: number; // Current energy level of the player
    maxEnergy: number; // Maximum energy level of the player
    health: number; // Current health of the player
    maxHealth: number; // Maximum health of the player
  };
  inventory: {
    items: { id: string; quantity: number; }[]; // List of items with their quantities
    capacity: number; // Maximum capacity of the inventory
    gold: number; // Amount of gold the player has
  };
  settings: {
    soundEnabled: boolean; // Whether sound is enabled
    notificationsEnabled: boolean; // Whether notifications are enabled
    difficulty: 'easy' | 'medium' | 'hard'; // Game difficulty level
    language: string; // Preferred language of the player
  };
  quests: {
    active: { id: string; progress: number; goal: number; }[]; // List of active quests with progress
    completed: string[]; // List of completed quest IDs
  };
  worldState: {
    currentLocation: string; // Current location of the player in the game world
    visitedLocations: string[]; // List of visited locations
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'; // Current time of day in the game
  };
  social: {
    friends: { id: string; name: string; status: 'online' | 'offline'; }[]; // List of friends with their statuses
    messages: { from: string; content: string; timestamp: number; }[]; // List of messages
  };
  achievementsProgress?: { [key: string]: number; }; // Progress for achievements
  [key: string]: unknown; // Allow additional properties for flexibility
}