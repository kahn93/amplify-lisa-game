interface ImportMetaEnv {
  VITE_AWS_REGION: string;
  VITE_AWS_USER_POOL_ID: string;
  VITE_AWS_USER_POOL_WEB_CLIENT_ID: string;
  VITE_AWS_IDENTITY_POOL_ID: string;
  VITE_API_URL: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}