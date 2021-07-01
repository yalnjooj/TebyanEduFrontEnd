import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { WebSocketLink } from 'apollo-link-ws'; // <-- Add new import
import { split } from 'apollo-link'; // <-- Add new import
import { getMainDefinition } from 'apollo-utilities'; // <-- Add new import


// { fetchPolicy: 'cache-first' }: This is the default fetch policy that Apollo Client uses when no fetch policy is specified. First it will try to fulfill the query from the cache. Only if the cache lookup fails will a query be sent to the server.
// { fetchPolicy: 'cache-only' }: With this option, Apollo Client will try to fulfill the query from the cache only. If not all data is available in the cache, an error will be thrown. This is equivalent to the former noFetch.
// { fetchPolicy: 'network-only' }: With this option, Apollo Client will bypass the cache and directly send the query to the server. This is equivalent to the former forceFetch.
// { fetchPolicy: 'cache-and-network' }: With this option, Apollo Client will query the server, but return data from the cache while the server request is pending, and later update the result when the server response has come back.

// https://www.apollographql.com/docs/react/api/core/ApolloClient/#apolloclient-functions
// https://stackoverflow.com/questions/47879016/how-to-disable-cache-in-apollo-link-or-apollo-client
const uri = 'http://localhost:3000/api/on/this/url'; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const http: any = httpLink.create({
    uri,
    withCredentials: true
  });

  const ws = new WebSocketLink({
    uri: `ws://localhost:3000/graphql`,
    options: {
      reconnect: true
    }
  });

  /**
   * Split the Apollo link to route differently based on the operation type. 
   */
  const link: any = split(
    // split based on operation type
    ({ query }) => {
      let definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    ws,
    http,
  );

  const opts: ApolloClientOptions<any> = {
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            currentUser: {
              merge(existing = [], incoming: any) {
                return { ...existing, ...incoming };
                // this part of code is depends what you actually need to do, in my 
               // case i had to save my incoming data as single object in cache
              }
            }
          }
        }
      }
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      }
    }
  };

  return opts;


  // return {
  //   cache: new InMemoryCache(),
  //   link: httpLink.create({ uri, withCredentials: true }),
  //   defaultOptions: {
  //     watchQuery: {
  //       fetchPolicy: 'network-only',
  //       errorPolicy: 'ignore',
  //     },
  //     query: {
  //       fetchPolicy: 'network-only',
  //       errorPolicy: 'all',
  //     },
  //     mutate: {
  //       fetchPolicy: 'no-cache',
  //       errorPolicy: 'all'
  //     }
  //   }
  // };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
