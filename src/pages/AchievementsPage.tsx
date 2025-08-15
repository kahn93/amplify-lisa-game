import React from 'react';
import { StorageManager } from '../../amplify/amplify/storage/resources';
import { AchievementsManager } from '../game/achievementsManager';

const AchievementsPage: React.FC = () => {
  const achievementsManager = new AchievementsManager();
  const storageManager = new StorageManager();
  const achievements = achievementsManager.getAchievements();

  const handleUnlockAchievement = async (id: string) => {
    achievementsManager.unlockAchievement(id);
    await storageManager.savePlayerData('playerId', { achievements }); // Example playerId
  };

  return (
    <div className="achievements-page">
      <h1>Achievements</h1>
      <ul>
        {achievements.map((achievement) => (
          <li key={achievement.id} className={achievement.isUnlocked ? 'unlocked' : 'locked'}>
            <h3>{achievement.name}</h3>
            <p>{achievement.description}</p>
            <p>Status: {achievement.isUnlocked ? 'Unlocked' : 'Locked'}</p>
            {!achievement.isUnlocked && (
              <button onClick={() => handleUnlockAchievement(achievement.id)}>Unlock</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AchievementsPage;
