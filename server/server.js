const { GraphQLServer, PubSub } = require("graphql-yoga");

// Schema for GarphQL
const typeDefs = `
    type Message {
        id: ID!
        user: String!
        content: String!
    }
    
    type Query {
        messages: [Message!]
    }
    
    type Mutation {
        postMessage(user: String!, content: String!): ID!
    }
    
    type Subscription {
        messages: [Message!]
    }
`;

// Subscribers: Polling of Client
const subscribers = [];
const onMessageUpdate = (fn) => subscribers.push(fn);

// Resolve new Array from Messages
const messages = [];
const resolvers = {
    Query: {
        messages: () => messages
    },

    Mutation: {
        postMessage: (parent, { user, content }) => {
            const id = messages.length;
            messages.push({
                id,
                user,
                content,
            });
            // When message is sended from client, callback functions execute
            subscribers.forEach(fn => fn());
            return id;
        },
    },

    Subscription: {
        messages: {
            subscribe: (parent, args, { pubsub }) => {
                const channel = Math.random().toString(36).slice(2, 15);
                const publishMessages = () => pubsub.publish(channel, { messages });
                onMessageUpdate(publishMessages);
                setTimeout(publishMessages, 0); // delay 0 => Immediately publish
                return pubsub.asyncIterator(channel);
            }
        }
    }
}

// Effect Polling of Client
const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
server.start(({ port }) => {
    console.log(`Server start on http://localhost:${port}`);
});