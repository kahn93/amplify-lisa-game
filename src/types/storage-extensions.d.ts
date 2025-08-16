declare module '@aws-amplify/storage' {
  export interface Storage {
    put(key: string, object: Record<string, unknown>, options?: { contentType?: string; }): Promise<{ key: string }>;
    get(key: string, options?: { download?: boolean; }): Promise<string | Blob | ArrayBuffer>;
  }
}