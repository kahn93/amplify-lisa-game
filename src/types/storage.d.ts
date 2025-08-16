declare module '@aws-amplify/storage' {
  export interface Storage {
    get(key: string, options?: Record<string, unknown>): Promise<string | Blob | ArrayBuffer>;
  }
}