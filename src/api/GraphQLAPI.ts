import { GraphQLAPI as AmplifyGraphQLAPI, graphqlOperation } from '@aws-amplify/api-graphql';

class GraphQLAPI {
  static async query<T>(query: string, variables: Record<string, any> = {}, options: Record<string, any> = {}) {
    return AmplifyGraphQLAPI.graphql(graphqlOperation(query, variables), options) as Promise<T>;
  }

  static async mutate<T>(mutation: string, variables: Record<string, any> = {}, options: Record<string, any> = {}) {
    return AmplifyGraphQLAPI.graphql(graphqlOperation(mutation, variables), options) as Promise<T>;
  }

  static async subscribe<T>(subscription: string, variables: Record<string, any> = {}, options: Record<string, any> = {}) {
    return AmplifyGraphQLAPI.graphql(graphqlOperation(subscription, variables), options) as AsyncIterator<T>;
  }
}

export default GraphQLAPI;