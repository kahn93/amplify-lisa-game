// Enhanced Resource Manager for the click mining game

export class ResourceManager {
  private resources: Record<string, number>;

  constructor() {
    this.resources = {};
  }

  // Add resources
  addResource(type: string, amount: number): void {
    if (!this.resources[type]) {
      this.resources[type] = 0;
    }
    this.resources[type] += amount;
  }

  // Get resource count
  getResource(type: string): number {
    return this.resources[type] || 0;
  }

  // Deduct resources
  deductResource(type: string, amount: number): boolean {
    if (this.resources[type] && this.resources[type] >= amount) {
      this.resources[type] -= amount;
      return true;
    }
    return false;
  }

  // Get all resources
  getAllResources(): Record<string, number> {
    return this.resources;
  }

  // Sync resources with external storage
  async syncResourcesWithStorage(playerId: string, storage: { get: (id: string) => Promise<Record<string, number> | null>; set: (id: string, data: Record<string, number>) => Promise<void>; }): Promise<void> {
    const storedResources = await storage.get(playerId);
    if (storedResources) {
      this.resources = { ...this.resources, ...storedResources };
    }
  }

  // Save resources to external storage
  async saveResourcesToStorage(playerId: string, storage: { set: (id: string, data: Record<string, number>) => Promise<void>; }): Promise<void> {
    await storage.set(playerId, this.resources);
  }

  // Reset resources
  resetResources(): void {
    this.resources = {};
  }

  // Utility: Sync lisaTokens with resources
  async syncCoinsWithResources(playerId: string, getCoinBalance: (id: string) => Promise<number>): Promise<void> {
    const coins = await getCoinBalance(playerId);
    this.resources["lisaTokens"] = coins;
  }

  // Utility: Sync resources with lisaTokens
  async syncResourcesWithCoins(playerId: string, setCoinBalance: (id: string, balance: number) => Promise<void>): Promise<void> {
    const coins = this.resources["lisaTokens"] || 0;
    await setCoinBalance(playerId, coins);
  }
}
