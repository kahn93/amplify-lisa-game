import { GameLogic } from '../../../src/game/gameLogic';

export const handler = async () => {
  const gameLogic = new GameLogic();
  gameLogic.upgradeMiningRate();
  return `Mining rate upgraded successfully.`;
};