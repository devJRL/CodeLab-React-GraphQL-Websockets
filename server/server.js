const {GraphQLServer} = require("graphql-yoga");

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
`;

// Resolve new Array from Messages
const messages = [];
const resolvers = {
    Query: {
        messages: () => messages
    }
}

const server = new GraphQLServer({ typeDefs, resolvers });
server.start ( ({ port }) => {
    console.log(`Server start on http://localhost:${port}`);
});