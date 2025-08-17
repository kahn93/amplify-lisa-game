const TON_API_KEY = import.meta.env.VITE_TON_API_KEY;
const TON_API_URL = "https://tonapi.io/v2";
const TON_RECEIVER = import.meta.env.VITE_TON_WALLET_ADDRESS;

// Send TON payment to receiver wallet
export async function sendTonPayment(amount: number, payload: string = "") {
  return fetch(`${TON_API_URL}/payments/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TON_API_KEY}`,
    },
    body: JSON.stringify({ address: TON_RECEIVER, amount, payload }),
  }).then(res => res.json());
}

// Verify TON payment
export async function verifyTonPayment(txHash: string) {
  return fetch(`${TON_API_URL}/payments/verify/${txHash}`, {
    headers: { "Authorization": `Bearer ${TON_API_KEY}` }
  }).then(res => res.json());
}