let users = [
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

let messages = [
  {
    id: 1,
    user: users[0],
    message: "hello",
    time: "1606488522712",
  },
  {
    id: 2,
    user: users[1],
    message: "hi",
    time: "1606488542712",
  },
  {
    id: 3,
    user: users[1],
    message: "nice to meet you",
    time: "1606488552712",
  }
];

module.exports = {
  users,
  messages,
};
