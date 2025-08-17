import { GraphQLAPI as API, graphqlOperation } from '@aws-amplify/api-graphql';
import React, { useEffect, useState } from 'react';
import { AchievementsManager } from '../game/achievementsManager';
import { gqlGetGameState, gqlSaveGameState } from '../graphql/customMutationsAndQueries';
import { GameState } from '../types/GameState';

const AchievementsPage: React.FC = () => {
  const achievementsManager = new AchievementsManager();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [earned, setEarned] = useState<string[]>([]);

  useEffect(() => {
    const playerId = ''; // TODO: Replace with actual player ID from auth/session
    const fetchGameState = async () => {
      try {
        const res = (await API.graphql({
          query: gqlGetGameState,
          variables: { playerID: playerId },
          authMode: 'AMAZON_COGNITO_USER_POOLS', // Adjust authMode as per your setup
        })) as { data: { getGameState: { gameState: string; }; }; };

        if (res?.data?.getGameState) {
          const state = JSON.parse(res.data.getGameState.gameState);
          setGameState(state);
          setEarned(state?.achievements?.unlocked || []);
        }
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    };
    fetchGameState();
  }, []);

  const handleUnlockAchievement = async (id: string) => {
    achievementsManager.unlockAchievement(id);
    const updatedAchievements = achievementsManager.getAchievements();
    setEarned(updatedAchievements.filter((ach) => ach.isUnlocked).map((ach) => ach.id.toString()));

    const playerId = ''; // TODO: Replace with actual player ID from auth/session
    const updatedGameState = {
      ...gameState,
      achievements: {
        unlocked: earned,
        totalUnlocked: earned.length,
      },
    };
    setGameState(updatedGameState);

    try {
      await API.graphql(
        graphqlOperation(gqlSaveGameState, {
          playerID: playerId,
          gameState: JSON.stringify(updatedGameState),
        })
      );
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  };

  return (
    <div className="achievements-page">
      <h1>Achievements</h1>
      <ul>
        {achievementsManager.getAchievements().map((achievement) => (
          <li key={achievement.id} className={earned.includes(achievement.id.toString()) ? 'unlocked' : 'locked'}>
            <h3>{achievement.name}</h3>
            <p>{achievement.description}</p>
            <p>Status: {earned.includes(achievement.id.toString()) ? 'Unlocked' : 'Locked'}</p>
            {!earned.includes(achievement.id.toString()) && (
              <button onClick={() => handleUnlockAchievement(achievement.id)}>Unlock</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AchievementsPage;
