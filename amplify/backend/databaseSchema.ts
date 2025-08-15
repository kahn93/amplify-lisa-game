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
