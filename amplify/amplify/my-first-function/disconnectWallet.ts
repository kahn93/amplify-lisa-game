import { TonConnectManager } from '../../../src/tonconnect/TonConnectManager';

export const handler = async () => {
  const tonConnectManager = new TonConnectManager();
  tonConnectManager.disconnectWallet();
  return `Wallet disconnected successfully.`;
};