import { GameLogic } from '../../src/game/gameLogic';

export const handler = async () => {
  const gameLogic = new GameLogic();
  gameLogic.mine();
  return `Resources mined successfully.`;
};