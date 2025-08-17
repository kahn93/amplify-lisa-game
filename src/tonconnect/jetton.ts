// Jetton integration utilities

const TON_API_KEY = import.meta.env.VITE_TON_API_KEY;
const TON_API_URL = "https://tonapi.io/v2";

export async function getJettonInfo(jettonAddress: string) {
    return fetch(`${TON_API_URL}/jettons/${jettonAddress}`, {
        headers: { "Authorization": `Bearer ${TON_API_KEY}` }
    }).then(res => res.json());
}

export async function transferJetton(from: string, to: string, jettonAddress: string, amount: number) {
    // Simulate transfer via API (actual transfer requires wallet interaction)
    return fetch(`${TON_API_URL}/jettons/transfer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TON_API_KEY}`,
        },
        body: JSON.stringify({ from, to, jettonAddress, amount }),
    }).then(res => res.json());
}
