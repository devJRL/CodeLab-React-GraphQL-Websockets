/*
 * Chat widget
 */
import React from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

// GraphQL Query | https://www.apollographql.com/docs/react/data/queries/#executing-a-query
const GET_MESSAGES = gql`
  query {
    messages {
      id
      content
      user
    }
  }
`;

const Messages = ({ user }) => {
  const { data } = useQuery(GET_MESSAGES);
  return data ? JSON.stringify(data) : null;
}

// ApolloClient | https://www.apollographql.com/docs/react/get-started/#create-a-client
const client = new ApolloClient({
  uri: 'http://localhost:4000', // GraphQL Server Endpoint
  cache: new InMemoryCache()
});

// ApolloProvider | https://www.apollographql.com/docs/react/get-started/#connect-your-client-to-react
const Chat = () => { // Somthing Like redux..
  return <div><Messages user="devJRL" /></div>;
};

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);