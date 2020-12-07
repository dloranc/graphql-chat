const subscriptions = {
  onConnect: (connectionParams, webSocket) => {
    console.log('subscriptions connected!');
  },
  path: '/subscriptions',
};

module.exports = subscriptions;
