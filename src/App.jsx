import React from 'react';
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import Chat from './chat.jsx';
const params = new URLSearchParams(window.location.search);
const currentUser = params.get('user') || 'guest';
const otherUser = currentUser === 'user1' ? 'user2' : 'user1';

const pubnub = new PubNub({
  publishKey: 'pub-c-c17256b2-9dac-4f9b-9555-7d64f430922a',
  subscribeKey: 'sub-c-0bb3ee19-8184-417c-8134-39cfe626653b',
  uuid: currentUser,
});

function App() {
  return (
    <PubNubProvider client={pubnub}>
      <Chat otherUser={otherUser} />
    </PubNubProvider>
  );
}

export default App;
