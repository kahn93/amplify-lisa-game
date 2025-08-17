const TON_API_KEY = import.meta.env.VITE_TON_API_KEY;
const TON_API_URL = "https://tonapi.io/v2";

// Send message to TON address (if supported)
export async function sendTonMessage(address: string, message: string) {
  return fetch(`${TON_API_URL}/messages/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TON_API_KEY}`,
    },
    body: JSON.stringify({ address, message }),
  }).then(res => res.json());
}