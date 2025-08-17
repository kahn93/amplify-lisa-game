// Airdrop integration utilities

const TON_API_KEY = import.meta.env.VITE_TON_API_KEY;
const TON_API_URL = "https://tonapi.io/v2";

export async function getAirdropStatus(address: string) {
  return fetch(`${TON_API_URL}/airdrops/${address}`, {
    headers: { "Authorization": `Bearer ${TON_API_KEY}` }
  }).then(res => res.json());
}

export async function claimAirdrop(address: string) {
  return fetch(`${TON_API_URL}/airdrops/claim`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TON_API_KEY}`,
    },
    body: JSON.stringify({ address }),
  }).then(res => res.json());
}