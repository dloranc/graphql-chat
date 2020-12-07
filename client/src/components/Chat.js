import React from 'react';
import { useQuery } from '@apollo/client';
import { cloneDeep } from 'lodash';
import MessageList from './MessageList';
import { GET_MESSAGES, GET_MESSAGES_SUBSCRIPTION } from '../queries/messages';

const Chat = () => {
  const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <MessageList messages={data.messages} subscribeToMore={() => subscribeToMore({
    document: GET_MESSAGES_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;

      const newMessage = subscriptionData.data.messageCreated;

      return Object.assign(cloneDeep(prev), {}, {
        messages: [...prev.messages, newMessage],
      });
    },
  })}/>
}

export default Chat;
