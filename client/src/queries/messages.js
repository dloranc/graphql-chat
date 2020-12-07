import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
  {
    messages {
      id,
      user {
        id,
        name
      },
      time,
      message
    }
  }
`

export const GET_MESSAGES_SUBSCRIPTION = gql`
  subscription {
    messageCreated {
      id
      user {
        id,
        name
      },
      time,
      message
    }
  }
`

export const UPDATE_MESSAGE = gql`
  mutation($userId: Int, $messageId: Int, $message: String) {
    updateMessage(userId: $userId, messageId: $messageId, message: $message) {
      id,
      message,
    }
  }
`

export const REMOVE_MESSAGE = gql`
  mutation($messageId: Int) {
    removeMessage(messageId: $messageId) {
      id,
      message,
    }
  }
`
