import { TonConnectManager } from '../../../src/tonconnect/TonConnectManager';

interface HandlerEvent {
  arguments: {
    amount: number;
    [key: string]: unknown;
  };
}

export const handler = async (event: HandlerEvent) => {
  const { amount } = event.arguments;
  const tonConnectManager = new TonConnectManager();
  await tonConnectManager.handleAirdrop(amount);
  return `Airdrop of ${amount} TON handled successfully.`;
};