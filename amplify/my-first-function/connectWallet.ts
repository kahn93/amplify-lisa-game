import { TonConnectManager } from '../../src/tonconnect/TonConnectManager';

export const handler = async () => {
  const tonConnectManager = new TonConnectManager();
  await tonConnectManager.connectWallet();
  return `Wallet connected successfully.`;
};