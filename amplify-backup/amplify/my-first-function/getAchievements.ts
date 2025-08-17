import { AchievementsManager } from '../../../src/game/achievementsManager';

export const handler = async () => {
  const achievementsManager = new AchievementsManager();
  return achievementsManager.getAchievements();
};