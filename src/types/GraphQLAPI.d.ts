// Type definitions for GraphQL API interactions

declare module 'GraphQLAPI' {
  export interface Query {
    [key: string]: unknown;
  }

  export interface Mutation {
    [key: string]: unknown;
  }

  export interface Subscription {
    [key: string]: unknown;
  }

  export interface GraphQLResponse<T> {
    data?: T;
    errors?: Array<{ message: string; path?: string[]; }>;
  }

  export type Variables = Record<string, unknown>;
  export type Options = Record<string, unknown>; // Added options type

  export interface GraphQLAPI {
    query<T = unknown>(query: string, variables?: Variables, options?: Options): Promise<GraphQLResponse<T>>;
    mutate<T = unknown>(mutation: string, variables?: Variables, options?: Options): Promise<GraphQLResponse<T>>;
    subscribe<T = unknown>(subscription: string, variables?: Variables, options?: Options): AsyncIterator<GraphQLResponse<T>>;
  }
}