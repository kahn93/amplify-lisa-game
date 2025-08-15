import { TonConnectManager } from '../../src/tonconnect/TonConnectManager';

export const handler = async (event: { arguments: { transactionId: string } }) => {
  const { transactionId } = event.arguments;
  const tonConnectManager = new TonConnectManager();
  const isValid = await tonConnectManager.verifyPurchase(transactionId);
  return isValid ? `Purchase verified successfully.` : `Purchase verification failed.`;
};