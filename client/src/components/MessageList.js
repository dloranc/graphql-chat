
import { useEffect } from 'react';
import Message from './Message';

const MessageList = ({ messages, subscribeToMore }) => {
  useEffect(() => {
    const unsubscribe = subscribeToMore();

    return () => unsubscribe();
  });

  return messages.map(({ id: messageId, user: { id, name }, message }) => (
    <Message
      key={messageId}
      messageId={messageId}
      userId={id}
      name={name}
      message={message}
    />
  ))
}

export default MessageList;
