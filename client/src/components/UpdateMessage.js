import { useState } from 'react';
import { useMutation } from '@apollo/client';
import currentUserId from '../utils/currentUserId';
import { UPDATE_MESSAGE } from '../queries/messages';

const UpdateMessage = ({ messageId, message, onSubmit, onClose }) => {
  let input;
  const [update] = useMutation(UPDATE_MESSAGE);
  const [updatedMessage, setUpdatedMessage] = useState(message);

  const onChange = ({target: { value }}) => {
    setUpdatedMessage(value)
  }

  return <form onSubmit={e => {
    e.preventDefault();

    if (input.value.length > 0) {
      update({
        variables: {
          userId: currentUserId,
          messageId,
          message: input.value
        }
      });

      onSubmit();
      input.value = '';
    }
  }}>
    <input ref={node => {
        input = node;
      }}
      value={updatedMessage}
      onChange={onChange}/>

    <button type="submit">Update</button>
    <button onClick={onClose}>Cancel</button>
  </form>
}

export default UpdateMessage;
