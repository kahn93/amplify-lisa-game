/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TON_API_KEY: string;
    readonly VITE_TELEGRAM_BOT_TOKEN: string;
    readonly VITE_RECEIVER_WALLET: string;
    readonly VITE_JETTON_MASTER_ADDRESS: string;
    readonly VITE_APP_URL: string;
    readonly VITE_TERMS_URL: string;
    readonly VITE_PRIVACY_URL: string;
    readonly VITE_GAME_NAME: string;
    readonly VITE_TELEGRAM_BOT_URL: string;
    readonly VITE_AWS_REGION: string;
    readonly VITE_AWS_USER_POOLS_ID: string;
    readonly VITE_AWS_USER_POOLS_WEB_CLIENT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
