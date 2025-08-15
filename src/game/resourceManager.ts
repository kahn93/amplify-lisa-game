// Resource management for the click mining game

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
}
