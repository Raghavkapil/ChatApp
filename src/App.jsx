import React from 'react';
import { useMemo } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import Chat from './chat';

function App() {
  const { currentUser, otherUser } = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('user') ?? 'guest';
    const other = user === 'user1' ? 'user2' : 'user1';
    return { currentUser: user, otherUser: other };
  }, []);

  const pubnub = useMemo(() => new PubNub({
    publishKey: 'pub-c-c17256b2-9dac-4f9b-9555-7d64f430922a',
    subscribeKey: 'sub-c-0bb3ee19-8184-417c-8134-39cfe626653b',
    uuid: currentUser,
  }), [currentUser]);

  return (
    <div className="flex flex-col items-center  min-h-screen bg-grey-100">
      <PubNubProvider client={pubnub}>
        <Chat otherUser={otherUser} />
      </PubNubProvider>
    </div> 
  );
}

export default App;
