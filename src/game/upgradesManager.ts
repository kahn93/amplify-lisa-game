// Enhanced Upgrades Manager for the click mining game

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  effects: Array<(currentValue: number, gameState: GameState) => number>;
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
  private costScalingFactor: number;

  constructor(costScalingFactor = 1.5) {
    this.costScalingFactor = costScalingFactor;
    this.upgrades = [
      {
        id: '1',
        name: 'Double Coins',
        description: 'Doubles the coins earned per click.',
        cost: 100,
        level: 0,
        effects: [(currentValue) => currentValue * 2],
      },
      {
        id: '2',
        name: 'Faster Mining',
        description: 'Increases mining speed by 50%.',
        cost: 200,
        level: 0,
        effects: [(currentValue) => currentValue * 1.5],
      },
      {
        id: '3',
        name: 'Energy Refill',
        description: 'Refills your energy to the maximum.',
        cost: 500,
        level: 0,
        effects: [(currentValue, gameState) => gameState.player.maxEnergy || currentValue],
      },
      {
        id: '4',
        name: 'Turbo Boost',
        description: 'Temporarily doubles your multiplier.',
        cost: 2000,
        level: 0,
        effects: [(currentValue) => currentValue * 2],
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
    upgrade.cost = Math.floor(upgrade.cost * this.costScalingFactor); // Increase cost for next level

    return { state: this.applyUpgradeEffects(newState, upgrade), message: `${upgrade.name} purchased!` };
  }

  // Apply upgrade effects
  applyUpgradeEffects(gameState: GameState, upgrade: Upgrade): GameState {
    const player = { ...gameState.player };
    upgrade.effects.forEach((effect) => {
      player.multiplier = effect(player.multiplier || 1, gameState);
    });
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
