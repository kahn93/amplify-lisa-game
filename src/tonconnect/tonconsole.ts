// TON Console integration for admin and developer operations

const TON_API_KEY = import.meta.env.VITE_TON_API_KEY;
const TON_CONSOLE_URL = "https://console.ton.org/api";
const TON_CENTER_URL = "https://toncenter.com/api/v2";

// TON Console: get contract info
export async function getContractInfo(contractAddress: string) {
  return fetch(`${TON_CONSOLE_URL}/contracts/${contractAddress}`, {
    headers: { "Authorization": `Bearer ${TON_API_KEY}` }
  }).then(res => res.json());
}

// TON Console: deploy contract
export async function deployContract(contractData: any) {
  return fetch(`${TON_CONSOLE_URL}/contracts/deploy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TON_API_KEY}`,
    },
    body: JSON.stringify(contractData),
  }).then(res => res.json());
}

// TON Center: get account info
export async function getTonCenterAccount(address: string) {
  return fetch(`${TON_CENTER_URL}/getAddressInfo?address=${address}&api_key=${TON_API_KEY}`)
    .then(res => res.json());
}