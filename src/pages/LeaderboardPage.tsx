import React, { useEffect, useState } from 'react';

interface Player {
  id: string;
  name: string;
  score: number;
}

const LeaderboardPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    // Simulate fetching leaderboard data
    const fetchLeaderboard = async () => {
      const data: Player[] = [
        { id: '1', name: 'Alice', score: 1500 },
        { id: '2', name: 'Bob', score: 1200 },
        { id: '3', name: 'Charlie', score: 1000 },
      ];
      setPlayers(data);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-page">
      <h1>Leaderboard</h1>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name}: {player.score} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderboardPage;
