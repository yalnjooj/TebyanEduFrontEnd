import { NgModule } from '@angular/core';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { WebSocketLink } from 'apollo-link-ws'; // <-- Add new import
import { ApolloLink, FetchResult, split } from 'apollo-link'; // <-- Add new import
import { getMainDefinition } from 'apollo-utilities'; // <-- Add new import
import { onError } from 'apollo-link-error';
import { HttpClientModule } from '@angular/common/http';


// { fetchPolicy: 'cache-first' }: This is the default fetch policy that Apollo Client uses when no fetch policy is specified. First it will try to fulfill the query from the cache. Only if the cache lookup fails will a query be sent to the server.
// { fetchPolicy: 'cache-only' }: With this option, Apollo Client will try to fulfill the query from the cache only. If not all data is available in the cache, an error will be thrown. This is equivalent to the former noFetch.
// { fetchPolicy: 'network-only' }: With this option, Apollo Client will bypass the cache and directly send the query to the server. This is equivalent to the former forceFetch.
// { fetchPolicy: 'cache-and-network' }: With this option, Apollo Client will query the server, but return data from the cache while the server request is pending, and later update the result when the server response has come back.

// https://www.apollographql.com/docs/react/api/core/ApolloClient/#apolloclient-functions
// https://stackoverflow.com/questions/47879016/how-to-disable-cache-in-apollo-link-or-apollo-client
const uri = 'http://localhost:3000/api/on/this/url'; // <-- add the URL of the GraphQL server here

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });


  const ws = new WebSocketLink({
    uri: `ws://localhost:3000/graphql`,
    options: {
      reconnect: true
    }
  });

// export function createApollo(httpLink: HttpLink, apollo: Apollo): ApolloClientOptions<any> {

  
//   const ws = new WebSocketLink({
//     uri: `ws://localhost:3000/graphql`,
//     options: {
//       reconnect: true
//     }
//   });

//   const http: any = httpLink.create({
//     uri,
//     withCredentials: true
//   });

//     // const httpLinkWithErrorHandling = ApolloLink.from([
//     //     errorLink,
//     //     http,
//     //     ws
//     // ]);

//   const links: any = split(
//     // split based on operation type
//     ({ query }) => {
//       let definition = getMainDefinition(query);
//       return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
//     },
//     ws,
//     http,
//   );







//   /**
//    * Split the Apollo link to route differently based on the operation type. 
//    */


//   const opts: ApolloClientOptions<any> = {
//     link: links,
//     cache: new InMemoryCache({
//       typePolicies: {
//         Query: {
//           fields: {
//             currentUser: {
//               merge(existing = [], incoming: any) {
//                 return { ...existing, ...incoming };
//                 // this part of code is depends what you actually need to do, in my 
//                // case i had to save my incoming data as single object in cache
//               }
//             },
//             mexCourseTables: {
//               merge(existing = [], incoming: any) {
//                 return { ...existing, ...incoming };
//                 // this part of code is depends what you actually need to do, in my 
//                // case i had to save my incoming data as single object in cache
//               }
//             }
//           }
//         }
//       }
//     }),
//     defaultOptions: {
//       watchQuery: {
//         fetchPolicy: 'network-only',
//         errorPolicy: 'ignore',
//       },
//       query: {
//         fetchPolicy: 'network-only',
//         errorPolicy: 'all',
//       },
//       mutate: {
//         fetchPolicy: 'no-cache',
//         errorPolicy: 'all'
//       }
//     }
//   };


//   // apollo.create({
//   //   link: links,
//   //   cache: new InMemoryCache()
//   // });
  
//   return opts;


// }

@NgModule({
  exports: [HttpClientModule]
})


  
export class GraphQLModule {



  constructor(apollo: Apollo, httpLink: HttpLink) {
    
    
    const http: any = httpLink.create({
      uri,
      withCredentials: true
    });


    const links: any = split(
      // split based on operation type
      ({ query }) => {
        let definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      ws,
      http,
    );

    apollo.create({
      link: links,
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
              },
              mexCourseTables: {
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
    });



  }





}
