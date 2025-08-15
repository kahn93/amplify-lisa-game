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
      // Add 27 more achievements here...
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
