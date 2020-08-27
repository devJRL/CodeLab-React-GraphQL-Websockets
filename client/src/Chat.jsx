/*
 * Chat widget
 */
import React from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// ApolloClient | https://www.apollographql.com/docs/react/get-started/#create-a-client
const client = new ApolloClient({
  uri: 'https://localhost:4000', // GraphQL Server Endpoint
  cache: new InMemoryCache()
});

// ApolloProvider | https://www.apollographql.com/docs/react/get-started/#connect-your-client-to-react
const Chat = () => { // Somthing Like redux..
  return <div>I'm a chat window</div>;
};

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);