import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import * as serviceWorker from './serviceWorker';

import { Houses } from './components/houses';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      House: {
        fields: {
          houses: {
            merge: (existing, incoming) => {
              // On initial load or when adding a recipe, offset is 0 and only take the incoming data to avoid duplication

              // This is only for pagination
              return incoming;
            },
          },
        },
      },
    },
  }),
});

render(
  <ApolloProvider client={client}>
    <Houses title="Houses" />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
