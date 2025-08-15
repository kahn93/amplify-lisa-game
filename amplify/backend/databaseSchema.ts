// Database schema for the click mining game

export const databaseSchema = {
  users: {
    id: 'string',
    username: 'string',
    walletAddress: 'string',
    coins: 'number',
    achievements: 'array',
    upgrades: 'array',
    premiumUpgrades: 'array',
    referrals: 'array',
    tasksCompleted: 'number',
    totalCoinsEarned: 'number',
    level: 'number',
    coinsPerTap: 'number',
    dailyCheckIn: 'boolean',
  },
  achievements: {
    id: 'string',
    name: 'string',
    description: 'string',
    isUnlocked: 'boolean',
  },
  upgrades: {
    id: 'string',
    name: 'string',
    cost: 'number',
    effect: 'string',
    level: 'number',
  },
  premiumUpgrades: {
    id: 'string',
    name: 'string',
    costInTon: 'number',
    effect: 'string',
  },
  tasks: {
    id: 'string',
    description: 'string',
    reward: 'number',
    isCompleted: 'boolean',
  },
  airdrop: {
    id: 'string',
    userId: 'string',
    percentage: 'number',
  },
};

export const storageFunctions = {
  savePlayerData: {
    description: 'Save player data to storage',
    parameters: {
      playerId: 'string',
      data: 'Record<string, unknown>',
    },
    returns: 'Promise<void>',
  },
  loadPlayerData: {
    description: 'Load player data from storage',
    parameters: {
      playerId: 'string',
    },
    returns: 'Promise<Record<string, unknown> | null>',
  },
  deletePlayerData: {
    description: 'Delete player data from storage',
    parameters: {
      playerId: 'string',
    },
    returns: 'Promise<void>',
  },
  listAllPlayers: {
    description: "List all players' data",
    parameters: {},
    returns: 'Promise<string[]>',
  },
  adjustPlayerCoins: {
    description: 'Adjust player coin balance',
    parameters: {
      playerId: 'string',
      adjustment: 'number',
    },
    returns: 'Promise<void>',
  },
};
