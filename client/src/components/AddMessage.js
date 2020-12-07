import { useMutation, gql } from '@apollo/client';

const CREATE_MESSAGE = gql`
  mutation($userId: Int, $message: String) {
    createMessage(userId: $userId, message: $message)
  }
`

const AddMessage = () => {
  let input;
  const [createMessage] = useMutation(CREATE_MESSAGE);

  return <form onSubmit={e => {
    e.preventDefault();
    if (input.value.length > 0) {
      createMessage({ variables: { userId: 1, message: input.value } });
      input.value = '';
    }
  }}>
    <input ref={node => {
        input = node;
      }}/>

    <button type="submit">Send</button>
  </form>
}

export default AddMessage;
