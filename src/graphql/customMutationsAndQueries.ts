// Enhanced Custom GraphQL Mutations and Queries

// Query to fetch all players with detailed stats
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
  }
}`;

// Mutation to save airdrop results with enhanced input validation
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

// Mutation to update player stats
export const updatePlayerStats = `mutation UpdatePlayerStats($id: ID!, $stats: PlayerStatsInput!) {
  updatePlayerStats(id: $id, stats: $stats) {
    success
    message
    updatedFields
  }
}`;

// Ensure this file exports gqlGetGameState and gqlSaveGameState
export const gqlGetGameState = `query GetGameState($playerID: ID!) {
  getGameState(playerID: $playerID) {
    gameState
  }
}`;

export const gqlSaveGameState = `mutation SaveGameState($playerID: ID!, $gameState: String!) {
  saveGameState(playerID: $playerID, gameState: $gameState) {
    success
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
}
