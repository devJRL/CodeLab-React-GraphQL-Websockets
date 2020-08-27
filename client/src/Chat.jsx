/*
 * Chat widget
 */
import React from 'react';
import { Container } from 'shards-react';
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

const Messages = ({ loginUser }) => {
  const { data } = useQuery(GET_MESSAGES);
  if (!data)
    return null;

  return (
    <>
      {data.messages.map(({ id, content, user: sendUser }) => (
        <div
          key={id}
          style={{
            display: 'flex',
            justifyContent: loginUser === sendUser ? 'flex-end' : 'flex-start',
            paddingBottom: '1em'
          }}
        >
          {loginUser !== sendUser && (
            <div
              style={{
                height: 50,
                width: 50,
                marginRight: "0.5em",
                border: "2px solid #e5e6ea",
                borderRadius: 25,
                textAlign: "center",
                fontSize: "18pt",
                paddingTop: 5,
              }}
            >
              {sendUser.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div
            style={{
              maxWidth: "60%",
              background: loginUser === sendUser ? '#58bf56' : '#e5e6ea',
              color: loginUser === sendUser ? 'white' : 'black',
              padding: '1em',
              borderRadius: '1em'
            }}
          >
            {content}
          </div>
        </div>
      ))}
    </>
  );
}

// ApolloClient | https://www.apollographql.com/docs/react/get-started/#create-a-client
const client = new ApolloClient({
  uri: 'http://localhost:4000', // GraphQL Server Endpoint
  cache: new InMemoryCache()
});

// ApolloProvider | https://www.apollographql.com/docs/react/get-started/#connect-your-client-to-react
const Chat = () => { // Somthing Like redux..
  return (
    <Container>
      <Messages loginUser="devJRL" />
    </Container>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);