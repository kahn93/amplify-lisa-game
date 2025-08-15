// Upgrades Manager for the click mining game

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  effect: (currentValue: number) => number;
}

export class UpgradesManager {
  private upgrades: Upgrade[];

  constructor() {
    this.upgrades = [
      {
        id: '1',
        name: 'Double Coins',
        description: 'Doubles the coins earned per click.',
        cost: 100,
        level: 0,
        effect: (currentValue) => currentValue * 2,
      },
      {
        id: '2',
        name: 'Faster Mining',
        description: 'Increases mining speed by 50%.',
        cost: 200,
        level: 0,
        effect: (currentValue) => currentValue * 1.5,
      },
      // Add 8 more upgrades here...
    ];
  }

  // Get all upgrades
  getUpgrades(): Upgrade[] {
    return this.upgrades;
  }

  // Purchase an upgrade by ID
  purchaseUpgrade(id: string, coins: number): { success: boolean; newCoins: number; } {
    const upgrade = this.upgrades.find((upg) => upg.id === id);
    if (upgrade && coins >= upgrade.cost) {
      upgrade.level += 1;
      upgrade.cost = Math.floor(upgrade.cost * 1.5); // Increase cost for next level
      return { success: true, newCoins: coins - upgrade.cost };
    }
    return { success: false, newCoins: coins };
  }

  // Apply upgrade effects
  applyUpgradeEffect(id: string, currentValue: number): number {
    const upgrade = this.upgrades.find((upg) => upg.id === id);
    return upgrade ? upgrade.effect(currentValue) : currentValue;
  }
}
