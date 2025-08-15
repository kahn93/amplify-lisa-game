import { defineFunction } from "@aws-amplify/backend";

export const myFirstFunction = defineFunction({
  name: "my-first-function",
  entry: "./handler.ts"
});

export const functions = [
  {
    name: "savePlayerData",
    description: "Save player data to storage",
    parameters: {
      playerId: "string",
      data: "Record<string, any>"
    },
    returns: "Promise<void>"
  },
  {
    name: "loadPlayerData",
    description: "Load player data from storage",
    parameters: {
      playerId: "string"
    },
    returns: "Promise<Record<string, any> | null>"
  },
  {
    name: "deletePlayerData",
    description: "Delete player data from storage",
    parameters: {
      playerId: "string"
    },
    returns: "Promise<void>"
  },
  {
    name: "listAllPlayers",
    description: "List all players' data",
    parameters: {},
    returns: "Promise<string[]>"
  },
  {
    name: "adjustPlayerCoins",
    description: "Adjust player coin balance",
    parameters: {
      playerId: "string",
      adjustment: "number"
    },
    returns: "Promise<void>"
  },
  {
    name: "getAchievements",
    description: "Retrieve all achievements",
    parameters: {},
    returns: "Achievement[]"
  },
  {
    name: "unlockAchievement",
    description: "Unlock an achievement by ID",
    parameters: {
      id: "string"
    },
    returns: "void"
  },
  {
    name: "calculateAirdrop",
    description: "Calculate airdrop distribution",
    parameters: {
      players: "PlayerStats[]"
    },
    returns: "Record<string, number>"
  },
  {
    name: "mine",
    description: "Mine resources",
    parameters: {},
    returns: "void"
  },
  {
    name: "getResources",
    description: "Get the current resource count",
    parameters: {},
    returns: "number"
  },
  {
    name: "upgradeMiningRate",
    description: "Upgrade the mining rate",
    parameters: {},
    returns: "void"
  },
  {
    name: "addResource",
    description: "Add resources",
    parameters: {
      type: "string",
      amount: "number"
    },
    returns: "void"
  },
  {
    name: "getResource",
    description: "Get resource count",
    parameters: {
      type: "string"
    },
    returns: "number"
  },
  {
    name: "deductResource",
    description: "Deduct resources",
    parameters: {
      type: "string",
      amount: "number"
    },
    returns: "boolean"
  },
  {
    name: "handleAirdrop",
    description: "Handle airdrop logic",
    parameters: {
      amount: "number"
    },
    returns: "Promise<void>"
  },
  {
    name: "connectWallet",
    description: "Connect to a wallet",
    parameters: {},
    returns: "Promise<void>"
  },
  {
    name: "disconnectWallet",
    description: "Disconnect wallet",
    parameters: {},
    returns: "void"
  },
  {
    name: "getWalletAddress",
    description: "Get wallet address",
    parameters: {},
    returns: "string | null"
  },
  {
    name: "verifyPurchase",
    description: "Verify purchase",
    parameters: {
      transactionId: "string"
    },
    returns: "Promise<boolean>"
  }
];
