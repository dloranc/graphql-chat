const { gql } = require('apollo-server');
const typeDefs = gql`
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

  type Query {
    users: [User]
    messages: [Message]
    userById(id: String!): User
    messageById(id: String!): Message
  }

  type Mutation {
    createMessage(userId: Int, message: String) : Boolean
    updateMessage(userId: Int, messageId: Int, message: String) : Message
    removeMessage(messageId: Int) : Message
  }

  type Subscription {
    messageCreated: Message
  }
`;

module.exports = typeDefs;
