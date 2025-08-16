declare module '@aws-amplify/storage' {
  export interface Storage {
    put<T>(key: string, object: T, options?: { contentType?: string; }): Promise<{ key: string }>;
    get(key: string, options?: { download?: boolean; }): Promise<{ Body: Blob | null; ContentType?: string; ContentLength?: number }>;
    remove(key: string, options?: Record<string, unknown>): Promise<{ success: boolean }>;
    list(path: string, options?: Record<string, unknown>): Promise<Array<{ key: string; size: number; lastModified: Date }>>;
  }
}