import { useState } from 'react';
import { useMutation } from '@apollo/client';
import UpdateMessage from '../components/UpdateMessage';
import currentUserId from '../utils/currentUserId';
import { REMOVE_MESSAGE } from '../queries/messages';

const Message = ({ name, message, messageId, userId }) => {
  const [editMode, setEditMode] = useState(false);
  const [removeMessageMutation] = useMutation(REMOVE_MESSAGE, {
    update: (cache, { data: { removeMessage } }) => {
      cache.modify({
        id: cache.identify(removeMessage),
        fields: {
          message(_, { DELETE }) {
            return DELETE;
          },
        },
      });
    }
  });

  const closeHandler = () => {
    setEditMode(false);
  }

  const updateMessageHandler = () => {
    setEditMode(true);
  }

  const removeMessageHandler = messageId => {
    removeMessageMutation({ variables: { messageId } });
  }

  return (
    <>
      {editMode ? <UpdateMessage messageId={messageId} message={message} onSubmit={closeHandler} onClose={closeHandler} /> : (
        <>
          <div>{name}: {message}</div>
          {userId === currentUserId && (
            <>
              <button onClick={() => updateMessageHandler(messageId)}>Edit</button>
              <button onClick={() => removeMessageHandler(messageId)}>Remove</button>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Message
