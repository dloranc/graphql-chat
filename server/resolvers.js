let { users, messages } = require('./data');
const { PubSub } = require('apollo-server');

const MESSAGE_CREATED = 'MESSAGE_CREATED';

const pubsub = new PubSub();

const getId = () => {
  if (messages.length > 0) {
    return messages[messages.length - 1].id + 1;
  } else {
    return 1;
  }
}

const resolvers = {
  Query: {
    users: () => users,
    messages: () => messages,
    userById: (_, { id }) => users.filter(user => user.id === id)[0],
    messageById: (_, { id }) => messages.filter(message => message.id === id)[0],
  },
  Mutation: {
    createMessage: (_, {userId, message}) => {
      const newMessage = {
        id: getId(),
        user: users.filter(u => u.id === userId)[0],
        message: message,
        time: Date.now(),
      };

      messages.push(newMessage)
      pubsub.publish(MESSAGE_CREATED, { messageCreated: newMessage });

      console.log(`Message ${newMessage.id} created!`);
    },
    updateMessage: (_, {userId, messageId, message}) => {
      const updatedMessage = messages.filter(m => m.id === messageId)[0];

      if (userId === updatedMessage.user.id) {
        const index = messages.findIndex(m => m.id === messageId);

        if (index !== -1) {
          messages[index].message = message;

          console.log(`Message ${updatedMessage.id} updated!`);

          return messages[index];
        }
      }
    },
    removeMessage: (_, { messageId }) => {
      const index = messages.findIndex(message => message.id === messageId);

      if (index !== -1) {
        const messageToRemove = { ...messages[index] };
        messages = [...messages.filter(message => message.id !== messageId)];

        console.log(`Message ${messageId} removed!`);
        return messageToRemove;
      }

      return null;
    }
  },
  Subscription: {
    messageCreated: {
      subscribe: () => {
        console.log('subscribed');
        return pubsub.asyncIterator([MESSAGE_CREATED]);
      },
    },
  },

};

module.exports = resolvers;
