import { TonConnectManager } from '../../src/tonconnect/TonConnectManager';

export const handler = async () => {
  const tonConnectManager = new TonConnectManager();
  return tonConnectManager.getWalletAddress();
};