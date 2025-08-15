import React from 'react';
import { Link } from 'react-router-dom';

const GameDashboard: React.FC = () => {
  return (
    <div className="game-dashboard">
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/game">Game</Link></li>
          <li><Link to="/achievements">Achievements</Link></li>
          <li><Link to="/upgrades">Upgrades</Link></li>
          <li><Link to="/store">Store</Link></li>
          <li><Link to="/friends">Friends</Link></li>
          <li><Link to="/tasks">Tasks</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default GameDashboard;
