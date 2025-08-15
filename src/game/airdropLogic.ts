// Airdrop logic for distributing rewards among players

export interface PlayerStats {
  id: string;
  coinsEarned: number;
  upgradesPurchased: number;
  tasksCompleted: number;
  tonSpent: number;
  timeSpent: number;
  achievementsUnlocked: number;
}

export class AirdropLogic {
  private totalPercentage = 100;

  calculateAirdrop(players: PlayerStats[]): Record<string, number> {
    const totalStats = {
      coinsEarned: 0,
      upgradesPurchased: 0,
      tasksCompleted: 0,
      tonSpent: 0,
      timeSpent: 0,
      achievementsUnlocked: 0,
    };

    // Aggregate total stats
    players.forEach((player) => {
      totalStats.coinsEarned += player.coinsEarned;
      totalStats.upgradesPurchased += player.upgradesPurchased;
      totalStats.tasksCompleted += player.tasksCompleted;
      totalStats.tonSpent += player.tonSpent;
      totalStats.timeSpent += player.timeSpent;
      totalStats.achievementsUnlocked += player.achievementsUnlocked;
    });

    // Calculate percentage for each player
    const airdropDistribution: Record<string, number> = {};
    players.forEach((player) => {
      const playerPercentage =
        (player.coinsEarned / totalStats.coinsEarned) * 0.3 +
        (player.upgradesPurchased / totalStats.upgradesPurchased) * 0.2 +
        (player.tasksCompleted / totalStats.tasksCompleted) * 0.2 +
        (player.tonSpent / totalStats.tonSpent) * 0.1 +
        (player.timeSpent / totalStats.timeSpent) * 0.1 +
        (player.achievementsUnlocked / totalStats.achievementsUnlocked) * 0.1;

      airdropDistribution[player.id] = Math.min(
        playerPercentage * this.totalPercentage,
        this.totalPercentage
      );
    });

    return airdropDistribution;
  }
}
