import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import * as serviceWorker from './serviceWorker';

import { Houses } from './components/houses';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
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
