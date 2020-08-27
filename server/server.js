const { GraphQLServer } = require("graphql-yoga");

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
`;

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
            return id;
        },
    },
}

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(({ port }) => {
    console.log(`Server start on http://localhost:${port}`);
});