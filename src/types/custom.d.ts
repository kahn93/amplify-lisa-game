declare module '@aws-amplify/storage' {
  export interface Storage {
    vault: {
      get(key: string, options?: Record<string, unknown>): Promise<string | object | null>;
      put(key: string, object: Record<string, unknown>, options?: Record<string, unknown>): Promise<{ key: string }>;
    };
  }
}