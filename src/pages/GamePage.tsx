import React, { useState } from 'react';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import ResourceDisplay from '../components/ResourceDisplay';
import { GameLogic } from '../game/gameLogic';

const GamePage: React.FC = () => {
  const [gameLogic] = useState(new GameLogic());
  const [resources, setResources] = useState(gameLogic.getResources());
  const [progress, setProgress] = useState(0);

  const handleMine = () => {
    gameLogic.mine();
    setResources(gameLogic.getResources());
    setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
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
