import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './utils/client';
import Chat from './components/Chat';
import AddMessage from './components/AddMessage';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Chat/>
        <AddMessage/>
      </div>
    </ApolloProvider>
  );
}

export default App;
