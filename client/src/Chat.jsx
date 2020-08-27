/*
 * Chat widget
 */
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useSubscription, useMutation } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { Container, Row, Col, FormInput, Button } from 'shards-react';

// GraphQL Query | https://www.apollographql.com/docs/react/data/queries/#executing-a-query
const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      content
      user
    }
  }
`;
// GraphQL Mutation | https://www.apollographql.com/docs/react/data/mutations/#executing-a-mutation
const POST_MESSAGES = gql`
  mutation($user: String!
          ,$content: String!
  ){
    postMessage (user: $user
                ,content: $content)
  }
`;

const Messages = ({ loginUser }) => {
  // Using Subscription, we don't need to polling
  const { data } = useSubscription(GET_MESSAGES);

  return !data ? null : (
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

// Apollo Subscription WebSocket | https://www.apollographql.com/docs/react/data/subscriptions/#2-initialize-a-websocketlink
const link = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true
  }
});

// ApolloClient | https://www.apollographql.com/docs/react/get-started/#create-a-client
const client = new ApolloClient({
  link, // Subscribe using WebSocket
  uri: 'http://localhost:4000', // GraphQL Server Endpoint
  cache: new InMemoryCache()
});

// ApolloProvider | https://www.apollographql.com/docs/react/get-started/#connect-your-client-to-react
const Chat = () => { // Somthing Like redux..
  const [state, stateSet] = React.useState({
    user: 'devJRL',
    content: '',
  });

  // Event of sending message content
  const [postMessage] = useMutation(POST_MESSAGES);
  const sendContent = () => {
    if (state.content.length > 0) {
      // GraphQL Mutation | https://www.apollographql.com/docs/react/data/mutations/#executing-a-mutation
      postMessage({ variables: state });
    }
    stateSet({
      ...state,
      content: '',
    })
  }

  // Shards React : Container | https://designrevision.com/docs/shards-react/component/container
  return (
    <Container>
      <Messages loginUser={state.user} />
      <Row>
        <Col xs={2} style={{ padding: 0 }}>
          <FormInput
            label="User"
            value={state.user}
            onChange={(event) => stateSet({
              ...state,
              user: event.target.value,
            })}
          />
        </Col>

        <Col xs={8}>
          <FormInput
            label="Content"
            value={state.content}
            onChange={(event) => stateSet({
              ...state,
              content: event.target.value,
            })}
            onKeyUp={(event) => {
              if (event.keyCode === 13)
                sendContent();
            }}
          />
        </Col>

        <Col xs={2} style={{ padding: 0 }}>
          <Button onClick={() => sendContent()}>
            Send
          </Button>
        </Col>
      </Row>
    </Container >
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);