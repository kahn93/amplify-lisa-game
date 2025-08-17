// Enhanced Game Logic for the click mining game

export interface TempBoost {
  multiplier: number;
  expires: number;
}

export interface Player {
  level: number;
  multiplier?: number;
  tempBoost?: TempBoost;
  lisaTokens?: number;
}

export interface GameState {
  player?: Player;
}

export class GameLogic {
  private resources: number;
  private miningRate: number;
  private gameState: GameState | null;

  constructor() {
    this.resources = 0;
    this.miningRate = 1; // Initial mining rate
    this.gameState = null;
  }

  // Method to mine resources
  mine(): void {
    this.resources += this.miningRate;
  }

  // Method to get the current resource count
  getResources(): number {
    return this.resources;
  }

  // Method to upgrade mining rate
  upgradeMiningRate(): void {
    this.miningRate += 1; // Increment mining rate
  }

  // Method to get the current mining rate
  getMiningRate(): number {
    return this.miningRate;
  }

  // Fetch game state from server
  async fetchGameState(playerId: string): Promise<void> {
    const gqlGetGameState = `
      query GetGameState($playerID: ID!) {
        getGameState(playerID: $playerID) {
          gameState
        }
      }
    `;

    try {
      const response = await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: gqlGetGameState, variables: { playerID: playerId } }),
      });
      const result = await response.json();
      this.gameState = result.data?.getGameState ? JSON.parse(result.data.getGameState.gameState) : null;
    } catch (error) {
      console.error("Error fetching game state:", error);
    }
  }

  // Calculate earnings per tap
  calculateEarnPerTap(): string {
    if (!this.gameState?.player) return "+0";
    let multiplier = this.gameState.player.multiplier || 1;
    if (this.gameState.player.tempBoost && this.gameState.player.tempBoost.expires > Date.now()) {
      multiplier *= this.gameState.player.tempBoost.multiplier;
    }
    const coinsPerTap = Math.floor(this.gameState.player.level * 8 * multiplier);
    return `+${coinsPerTap}`;
  }

  // Calculate coins needed to level up
  calculateCoinsToLevelUp(): string {
    if (!this.gameState?.player) return "1M";
    const nextLevel = this.gameState.player.level + 1;
    const required = nextLevel * 1000;
    const remaining = required - (this.gameState.player.lisaTokens ?? 0);
    return remaining > 0 ? remaining.toLocaleString() : "Level Up!";
  }

  // Calculate profit per hour
  calculateProfitPerHour(): string {
    let multiplier = this.gameState?.player?.multiplier || 1;
    if (this.gameState?.player?.tempBoost && this.gameState.player.tempBoost.expires > Date.now()) {
      multiplier *= this.gameState.player.tempBoost.multiplier;
    }
    const coinsPerTap = Math.floor((this.gameState?.player?.level || 1) * 8 * multiplier);
    return `+${(coinsPerTap * 100).toLocaleString()}`;
  }

  // Calculate total profit
  calculateProfit(): string {
    if (!this.gameState?.player) return "+0";
    return `+${(this.gameState.player.lisaTokens || 0).toLocaleString()}`;
  }
}
