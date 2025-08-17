// Achievements Manager for the click mining game

export interface Achievement {
  id: string;
  name: string;
  description: string;
  isUnlocked: boolean;
}

export class AchievementsManager {
  private achievements: Achievement[];

  constructor() {
    this.achievements = [
      { id: '1', name: 'First Click', description: 'Perform your first click.', isUnlocked: false },
      { id: '2', name: '100 Clicks', description: 'Perform 100 clicks.', isUnlocked: false },
      { id: '3', name: '1,000 Coins', description: 'Earn 1,000 coins.', isUnlocked: false },
      { id: '4', name: '10,000 Coins', description: 'Earn 10,000 coins.', isUnlocked: false },
      { id: '5', name: 'First Upgrade', description: 'Purchase your first upgrade.', isUnlocked: false },
      { id: '6', name: 'Max Mining Power', description: 'Reach maximum mining power.', isUnlocked: false },
      { id: '7', name: 'Millionaire', description: 'Earn 1,000,000 coins.', isUnlocked: false },
      { id: '8', name: 'Persistent Miner', description: 'Play for 7 consecutive days.', isUnlocked: false },
      { id: '9', name: 'Resourceful', description: 'Collect 10,000 resources.', isUnlocked: false },
      { id: '10', name: 'Strategist', description: 'Unlock all upgrades.', isUnlocked: false },
      { id: '11', name: 'Collector', description: 'Unlock all achievements.', isUnlocked: false },
      { id: '12', name: 'Speed Clicker', description: 'Perform 1,000 clicks in a minute.', isUnlocked: false },
      { id: '13', name: 'Dedicated Player', description: 'Play for 30 consecutive days.', isUnlocked: false },
      { id: '14', name: 'Wealthy Miner', description: 'Earn 10,000,000 coins.', isUnlocked: false },
      { id: '15', name: 'Generous', description: 'Gift 1,000 coins to another player.', isUnlocked: false },
      { id: '16', name: 'Investor', description: 'Invest in 10 upgrades.', isUnlocked: false },
      { id: '17', name: 'Explorer', description: 'Discover a hidden feature.', isUnlocked: false },
      { id: '18', name: 'Lucky Miner', description: 'Win a jackpot.', isUnlocked: false },
      { id: '19', name: 'Team Player', description: 'Join a mining team.', isUnlocked: false },
      { id: '20', name: 'Leader', description: 'Lead a mining team to victory.', isUnlocked: false },
      { id: '21', name: 'Top Miner', description: 'Rank #1 on the leaderboard.', isUnlocked: false },
      { id: '22', name: 'Efficient Miner', description: 'Mine 1,000 resources in a minute.', isUnlocked: false },
      { id: '23', name: 'Master Strategist', description: 'Complete the game.', isUnlocked: false },
      { id: '24', name: 'Quick Learner', description: 'Complete the tutorial.', isUnlocked: false },
      { id: '25', name: 'Social Butterfly', description: 'Invite 10 friends to play.', isUnlocked: false },
      { id: '26', name: 'Generational Wealth', description: 'Pass 1,000,000 coins to the next generation.', isUnlocked: false },
      { id: '27', name: 'Ultimate Miner', description: 'Achieve all milestones.', isUnlocked: false },
      { id: '28', name: 'Legendary Miner', description: 'Earn 100,000,000 coins.', isUnlocked: false },
    ];
  }

  // Get all achievements
  getAchievements(): Achievement[] {
    return this.achievements;
  }

  // Unlock an achievement by ID
  unlockAchievement(id: string): void {
    const achievement = this.achievements.find((ach) => ach.id === id);
    if (achievement && !achievement.isUnlocked) {
      achievement.isUnlocked = true;
      console.log(`Achievement unlocked: ${achievement.name}`);
    }
  }

  // Check if an achievement is unlocked
  isAchievementUnlocked(id: string): boolean {
    const achievement = this.achievements.find((ach) => ach.id === id);
    return achievement ? achievement.isUnlocked : false;
  }
}
