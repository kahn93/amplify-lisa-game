import React, { useState } from 'react';
import { StorageManager } from '../../amplify/amplify/storage/resources';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import ResourceDisplay from '../components/ResourceDisplay';
import { GameLogic } from '../game/gameLogic';

const GamePage: React.FC = () => {
  const [gameLogic] = useState(new GameLogic());
  const [resources, setResources] = useState(gameLogic.getResources());
  const [progress, setProgress] = useState(0);
  const storageManager = new StorageManager();

  const handleMine = async () => {
    gameLogic.mine();
    const newResources = gameLogic.getResources();
    setResources(newResources);
    setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    await storageManager.adjustPlayerCoins('playerId', newResources); // Example playerId
  };

  return (
    <div className="game-page">
      <h1>Mine Resources</h1>
      <img
        src="/image/clickimg.png"
        alt="Clickable Mining Image"
        className="clickable-mining-image"
        onClick={handleMine}
      />
      <ResourceDisplay resourceName="Gold" resourceCount={resources} />
      <ProgressBar progress={progress} />
      <Button label="Mine" onClick={handleMine} />
    </div>
  );
};

export default GamePage;
