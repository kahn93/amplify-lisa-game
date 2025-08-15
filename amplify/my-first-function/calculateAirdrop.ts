import { AirdropLogic } from '../../src/game/airdropLogic';
import type { PlayerStats } from '../../src/game/airdropLogic';

interface HandlerEvent {
  arguments: {
    players: unknown; // Replace 'unknown' with the actual type if known
  };
}

export const handler = async (event: HandlerEvent) => {
  const { players } = event.arguments;
  const airdropLogic = new AirdropLogic();
  // Assert players as PlayerStats[]
  return airdropLogic.calculateAirdrop(players as PlayerStats[]);
};