// Enhanced Custom GraphQL Mutations and Queries

/**
 * Query to fetch all players with detailed stats.
 * Use this query to retrieve player information for leaderboard or analytics.
 */
export const getAllPlayers = `query GetAllPlayers {
  getAllPlayers {
    id
    name
    email
    coinsEarned
    upgradesPurchased
    tasksCompleted
    tonSpent
    timeSpent
    achievementsUnlocked
    lastActive
    createdAt
    friendsCount
    inventoryItems
    rank
    avatarUrl
  }
}`;

/**
 * Mutation to save airdrop results with enhanced input validation.
 * Ensure the input array is not empty and contains valid AirdropResultInput objects.
 */
export const saveAirdropResults = `mutation SaveAirdropResults($results: [AirdropResultInput!]!) {
  saveAirdropResults(results: $results) {
    success
    message
    errors {
      field
      message
    }
  }
}`;

/**
 * Mutation to update player stats.
 * Use this mutation to update specific fields in a player's stats.
 */
export const updatePlayerStats = `mutation UpdatePlayerStats($id: ID!, $stats: PlayerStatsInput!) {
  updatePlayerStats(id: $id, stats: $stats) {
    success
    message
    updatedFields
  }
}`;

/**
 * Query to fetch game state for a specific player.
 * Fetch only essential fields to reduce payload size.
 */
export const gqlGetGameState = `query GetGameState($playerID: ID!) {
  getGameState(playerID: $playerID) {
    gameState
    lastUpdated
    achievementsProgress
    inventoryState
  }
}`;

/**
 * Mutation to save game state for a specific player.
 * Ensure the gameState string is properly serialized before sending.
 */
export const gqlSaveGameState = `mutation SaveGameState($playerID: ID!, $gameState: String!) {
  saveGameState(playerID: $playerID, gameState: $gameState) {
    success
    message
    timestamp
    updatedFields
  }
}`;

/**
 * Mutation to reset player progress.
 * Use this mutation to reset all progress for a player.
 */
export const resetPlayerProgress = `mutation ResetPlayerProgress($playerID: ID!) {
  resetPlayerProgress(playerID: $playerID) {
    success
    message
    resetTimestamp
  }
}`;

/**
 * Mutation to add a friend.
 * Ensure both playerID and friendID are valid before calling this mutation.
 */
export const addFriend = `mutation AddFriend($playerID: ID!, $friendID: ID!) {
  addFriend(playerID: $playerID, friendID: $friendID) {
    success
    message
    friend {
      id
      name
      avatarUrl
    }
  }
}`;

/**
 * Mutation to send a message.
 * Validate the content string to avoid empty or excessively long messages.
 */
export const sendMessage = `mutation SendMessage($fromID: ID!, $toID: ID!, $content: String!) {
  sendMessage(fromID: $fromID, toID: $toID, content: $content) {
    success
    message
    timestamp
  }
}`;

// Define input types for mutations
export interface AirdropResultInput {
  id: string;
  percent: number;
  points: number;
}

export interface PlayerStatsInput {
  coinsEarned?: number;
  upgradesPurchased?: number;
  tasksCompleted?: number;
  tonSpent?: number;
  timeSpent?: number;
  achievementsUnlocked?: number;
  experienceGained?: number; // New field for experience points
  energyUsed?: number; // New field for energy consumption
  healthRestored?: number; // New field for health restoration
}
