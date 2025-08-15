// TonConnectManager for handling wallet connection and Ton-related features

import { TonConnect } from '@tonconnect/sdk';

export class TonConnectManager {
  private tonConnect: TonConnect;

  constructor() {
    this.tonConnect = new TonConnect();
  }

  // Connect to a wallet
  async connectWallet(): Promise<void> {
    try {
      await this.tonConnect.connect();
      console.log('Wallet connected successfully.');
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  }

  // Disconnect wallet
  disconnectWallet(): void {
    this.tonConnect.disconnect();
    console.log('Wallet disconnected successfully.');
  }

  // Get wallet address
  getWalletAddress(): string | null {
    return this.tonConnect.wallet?.address || null;
  }

  // Verify purchase
  async verifyPurchase(transactionId: string): Promise<boolean> {
    try {
      const isValid = await this.tonConnect.verifyTransaction(transactionId);
      console.log('Purchase verification:', isValid);
      return isValid;
    } catch (error) {
      console.error('Error verifying purchase:', error);
      return false;
    }
  }

  // Handle airdrop logic
  async handleAirdrop(amount: number): Promise<void> {
    try {
      await this.tonConnect.sendTransaction({ amount });
      console.log('Airdrop sent successfully.');
    } catch (error) {
      console.error('Error sending airdrop:', error);
    }
  }
}
