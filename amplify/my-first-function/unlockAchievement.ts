import { AchievementsManager } from '../../src/game/achievementsManager';

interface UnlockAchievementEvent {
  arguments: {
    id: string;
  };
}

export const handler = async (event: UnlockAchievementEvent) => {
  const { id } = event.arguments;
  const achievementsManager = new AchievementsManager();
  achievementsManager.unlockAchievement(id);
  return `Achievement ${id} unlocked successfully.`;
};