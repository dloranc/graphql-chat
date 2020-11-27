import React, { useState, useEffect } from 'react';
import './App.css';
import { gql } from 'apollo-boost';
import client from './utils/client';

const query = {
  query: gql`
    {
      messages {
        id,
        user {
          name
        },
        time,
        message
      }
    }
  `
}

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.query(query);

        console.log(response.data.messages);

        setMessages(response.data.messages);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  });


  return (
    <div className="App">
      <div>
        {messages.map(({ id, user: { name }, message }) => <div key={id}>{name}: {message}</div>)}
      </div>

      <input/>
    </div>
  );
}

export default App;
