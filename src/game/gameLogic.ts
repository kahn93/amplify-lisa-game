// Core game logic for the click mining game

export class GameLogic {
  private resources: number;
  private miningRate: number;

  constructor() {
    this.resources = 0;
    this.miningRate = 1; // Initial mining rate
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
}
