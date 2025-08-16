import Address from '@tonconnect/sdk';

// Convert address to user-friendly format
export function convertAddressToUserFriendly(address: Address): string {
  return address.toString();
}

// Type guard for wallet info
export function isWalletInfo(obj: unknown): obj is Address {
  return !!obj && typeof (obj as Address).toString === 'function';
}