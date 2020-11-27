const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type User {
    id: Int!
    name: String!
    email: String!
  }

  type Message {
    id: Int!
    user: User!
    time: String!
    message: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "products" query returns an array of zero or more Products (defined above).
  type Query {
    users: [User]
    messages: [Message]
    userById(id: String!): User
    messageById(id: String!): Message
  }
`;

const users = [
  {
    id: 1,
    name: "Dawid",
    email: "dawid@example.com",
  },
  {
    id: 2,
    name: "John",
    email: "john@example.com",
  },
  {
    id: 3,
    name: "Ben",
    email: "ben@example.com",
  }
];

const messages = [
  {
    id: 1,
    user: users[0],
    message: "hello",
    time: "2020-11-25 10:30:12",
  },
  {
    id: 2,
    user: users[1],
    message: "hi",
    time: "2020-11-25 10:31:52",
  },
  {
    id: 3,
    user: users[1],
    message: "nice to meet you",
    time: "2020-11-25 10:31:27",
  }
];

// Resolvers define the technique for fetching the types defined in the schema.
const resolvers = {
  Query: {
    users: () => users,
    messages: () => messages,
    userById: (_, { id }) => users.filter(user => user.id === id)[0],
    messageById: (_, { id }) => messages.filter(message => message.id === id)[0],
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
