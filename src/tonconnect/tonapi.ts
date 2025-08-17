// TON API integration for on-chain storage, jetton, airdrop, and other services

const TON_API_KEY = import.meta.env.VITE_TON_API_KEY;
const TON_API_URL = "https://tonapi.io/v2";

// Generic TON API request
export async function tonApiRequest(endpoint: string, method: string = "GET", body?: any) {
  const url = `${TON_API_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${TON_API_KEY}`,
  };
  const options: RequestInit = {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  };
  const response = await fetch(url, options);
  return response.json();
}

// Get wallet info
export async function getWalletInfo(address: string) {
  return tonApiRequest(`/accounts/${address}`);
}

// Get Jetton balances
export async function getJettonBalances(address: string) {
  return tonApiRequest(`/accounts/${address}/jettons`);
}

// Store data on-chain (simulate with API)
export async function storeOnChain(address: string, data: any) {
  return tonApiRequest(`/accounts/${address}/storage`, "POST", data);
}

// Get airdrop info
export async function getAirdropInfo(address: string) {
  return tonApiRequest(`/accounts/${address}/airdrops`);
}