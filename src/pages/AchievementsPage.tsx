import React from 'react';
import { AchievementsManager } from '../game/achievementsManager';

const AchievementsPage: React.FC = () => {
  const achievementsManager = new AchievementsManager();
  const achievements = achievementsManager.getAchievements();

  return (
    <div className="achievements-page">
      <h1>Achievements</h1>
      <ul>
        {achievements.map((achievement) => (
          <li key={achievement.id} className={achievement.isUnlocked ? 'unlocked' : 'locked'}>
            <h3>{achievement.name}</h3>
            <p>{achievement.description}</p>
            <p>Status: {achievement.isUnlocked ? 'Unlocked' : 'Locked'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AchievementsPage;
