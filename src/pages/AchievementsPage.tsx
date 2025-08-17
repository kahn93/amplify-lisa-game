import React, { useEffect, useState } from 'react';
import GraphQLAPI from '../api/GraphQLAPI';
import { AchievementsManager } from '../game/achievementsManager';
import { loadGameState, saveGameState } from '../game/GameStorage';
import { gqlGetGameState, gqlSaveGameState } from '../graphql/customMutationsAndQueries';
import { GameState } from '../types/GameState';

const defaultGameState: GameState = {
  achievements: {
    unlocked: [],
    totalUnlocked: 0,
  },
  lastSavedTimestamp: Date.now(),
  playerStats: {
    coins: 0,
    level: 1,
    experience: 0,
    energy: 100,
    maxEnergy: 100,
    health: 100,
    maxHealth: 100,
  },
  inventory: {
    items: [],
    capacity: 50,
    gold: 0,
  },
  settings: {
    soundEnabled: true,
    notificationsEnabled: true,
    difficulty: 'medium',
    language: 'en',
  },
  quests: {
    active: [],
    completed: [],
  },
  worldState: {
    currentLocation: 'home',
    visitedLocations: [],
    timeOfDay: 'morning',
  },
  social: {
    friends: [],
    messages: [],
  },
};

const AchievementsPage: React.FC = () => {
  const achievementsManager = new AchievementsManager();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [earned, setEarned] = useState<string[]>([]);

  useEffect(() => {
    const playerId = ''; // TODO: Replace with actual player ID from auth/session
    const fetchGameState = async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`, // Retrieve authToken from localStorage or provide a fallback
          },
        };

        const res = (await GraphQLAPI.query(
          gqlGetGameState,
          { playerID: playerId },
          options // Pass headers directly to GraphQLAPI
        )) as { data: { getGameState: { gameState: string; }; }; };

        if (res?.data?.getGameState) { // Corrected misplaced parenthesis
          const state: GameState = JSON.parse(res.data.getGameState.gameState);
          setGameState(state);
          setEarned(state.achievements.unlocked);
        }
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    };
    fetchGameState();
  }, []);

  useEffect(() => {
    const loadedState = loadGameState();
    const state: GameState = loadedState && 'achievements' in loadedState
      ? (loadedState as GameState)
      : defaultGameState;
    setGameState(state);
    setEarned(state.achievements.unlocked);
  }, []);

  const handleUnlockAchievement = async (id: string) => {
    achievementsManager.unlockAchievement(id);
    const updatedAchievements = achievementsManager.getAchievements();
    setEarned(updatedAchievements.filter((ach) => ach.isUnlocked).map((ach) => ach.id.toString()));

    const updatedGameState: GameState = {
      ...gameState!,
      achievements: {
        unlocked: earned,
        totalUnlocked: earned.length,
      },
      lastSavedTimestamp: Date.now(),
      playerStats: {
        ...gameState!.playerStats,
        experience: (gameState!.playerStats.experience || 0) + 10, // Add experience points
        coins: gameState!.playerStats.coins + 50, // Reward coins for unlocking achievements
      },
    };
    setGameState(updatedGameState);
    saveGameState(updatedGameState);

    const playerId = ''; // TODO: Replace with actual player ID from auth/session
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`, // Retrieve authToken from localStorage or provide a fallback
      },
    };

    try {
      const res = await GraphQLAPI.mutate(
        gqlSaveGameState,
        {
          playerID: playerId,
          gameState: JSON.stringify(updatedGameState),
        },
        options // Pass headers directly to GraphQLAPI
      );
      console.log('Game state saved successfully:', res);
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
