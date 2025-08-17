// Enhanced Upgrades Manager for the click mining game

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  effect: (currentValue: number) => number;
}

export interface Player {
  lisaTokens: number;
  multiplier?: number;
  energy?: number;
  maxEnergy?: number;
}

export interface GameState {
  player: Player;
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
      {
        id: '3',
        name: 'Energy Refill',
        description: 'Refills your energy to the maximum.',
        cost: 500,
        level: 0,
        effect: (currentValue) => currentValue,
      },
      {
        id: '4',
        name: 'Turbo Boost',
        description: 'Temporarily doubles your multiplier.',
        cost: 2000,
        level: 0,
        effect: (currentValue) => currentValue * 2,
      },
    ];
  }

  // Get all upgrades
  getUpgrades(): Upgrade[] {
    return this.upgrades;
  }

  // Purchase an upgrade by ID
  purchaseUpgrade(gameState: GameState, id: string): { state: GameState; message: string; } {
    const upgrade = this.upgrades.find((upg) => upg.id === id);
    if (!upgrade) {
      return { state: gameState, message: 'Upgrade not found.' };
    }
    if (gameState.player.lisaTokens < upgrade.cost) {
      return { state: gameState, message: 'Not enough coins!' };
    }

    // Deduct cost and apply upgrade
    const newState: GameState = {
      ...gameState,
      player: {
        ...gameState.player,
        lisaTokens: gameState.player.lisaTokens - upgrade.cost,
      },
    };

    upgrade.level += 1;
    upgrade.cost = Math.floor(upgrade.cost * 1.5); // Increase cost for next level

    return { state: this.applyUpgradeEffect(newState, upgrade), message: `${upgrade.name} purchased!` };
  }

  // Simplified purchase logic for standalone use
  purchaseUpgradeStandalone(id: string, coins: number): { success: boolean; newCoins?: number; message: string; } {
    const upgrade = this.upgrades.find((upg) => upg.id === id);
    if (!upgrade) {
      return { success: false, message: 'Upgrade not found.' };
    }

    if (coins >= upgrade.cost) {
      const newCoins = coins - upgrade.cost;
      upgrade.level += 1;
      upgrade.cost = Math.floor(upgrade.cost * 1.5); // Increase cost for next level
      return { success: true, newCoins, message: `${upgrade.name} purchased successfully.` };
    } else {
      return { success: false, message: 'Not enough coins.' };
    }
  }

  // Enhanced purchase logic with detailed state and coin tracking
  purchaseUpgradeEnhanced(id: string, coins: number): { state: GameState; message: string; newCoins?: number; } {
    const upgrade = this.upgrades.find((upg) => upg.id === id);
    if (!upgrade) {
      return { state: { player: { lisaTokens: coins } }, message: 'Upgrade not found.' };
    }

    if (coins >= upgrade.cost) {
      const newCoins = coins - upgrade.cost;
      upgrade.level += 1;
      upgrade.cost = Math.floor(upgrade.cost * 1.5); // Increase cost for next level
      return {
        state: { player: { lisaTokens: newCoins } },
        message: `${upgrade.name} purchased successfully!`,
        newCoins,
      };
    } else {
      return { state: { player: { lisaTokens: coins } }, message: 'Not enough coins.' };
    }
  }

  // Apply upgrade effects
  applyUpgradeEffect(gameState: GameState, upgrade: Upgrade): GameState {
    const player = { ...gameState.player };
    switch (upgrade.id) {
      case '1': // Double Coins
        player.multiplier = Math.max(player.multiplier || 1, 2);
        break;
      case '2': // Faster Mining
        player.multiplier = Math.max(player.multiplier || 1, 1.5);
        break;
      case '3': // Energy Refill
        player.energy = player.maxEnergy;
        break;
      case '4': // Turbo Boost
        player.multiplier = (player.multiplier || 1) * 2;
        break;
      default:
        console.warn(`Unknown upgrade ID: ${upgrade.id}`);
        break;
    }
    return { ...gameState, player };
  }

  // Advanced logic: Validate upgrades
  validateUpgrades(): boolean {
    return this.upgrades.every((upgrade) => upgrade.cost > 0 && upgrade.level >= 0);
  }

  // Log upgrade summary
  logUpgradeSummary(): void {
    console.log('Upgrades Summary:', this.upgrades.map((upg) => ({ id: upg.id, level: upg.level, cost: upg.cost })));
  }
}
