/* eslint-disable @typescript-eslint/no-unused-vars */
import { GraphQLResult } from '@aws-amplify/api';
import { GraphQLAPI as AmplifyGraphQLAPI, graphqlOperation } from '@aws-amplify/api-graphql';

class GraphQLAPI {
  static async query<T>(query: string, variables: Record<string, unknown> = {}): Promise<GraphQLResult<T>> {
    return AmplifyGraphQLAPI.graphql(graphqlOperation(query, variables), {}) as Promise<GraphQLResult<T>>;
  }

  static async mutate<T>(mutation: string, variables: Record<string, unknown> = {}, options: Record<string, unknown> = {}): Promise<GraphQLResult<T>> {
    return AmplifyGraphQLAPI.graphql(graphqlOperation(mutation, variables), options) as Promise<GraphQLResult<T>>;
  }

  static async subscribe<T>(subscription: string, variables: Record<string, unknown> = {}): Promise<AsyncIterator<GraphQLResult<T>, undefined, undefined>> {
    const result = AmplifyGraphQLAPI.graphql(graphqlOperation(subscription, variables), {});
    if (result instanceof Promise) {
      throw new Error('Subscriptions must return an Observable, not a Promise.');
    }
    return result as unknown as AsyncIterator<GraphQLResult<T>>;
  }
}

export default GraphQLAPI;