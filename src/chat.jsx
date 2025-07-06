import React, { useEffect, useState } from 'react';
import { usePubNub } from 'pubnub-react';
import 'tailwindcss'

function Chat({ otherUser }) {
  const pubnub = usePubNub();
  const currentUser = pubnub.getUUID();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Create consistent channel name for both users
  const CHANNEL = [currentUser, otherUser].sort().join('-');

  useEffect(() => {
    // Subscribe to the channel
    pubnub.subscribe({ channels: [CHANNEL] });

    // Listen for incoming messages
    const listener = {
      message: (event) => {
        setMessages((prev) => [...prev, event.message]);
        console.log('Received message:', event.message);
      },
    };

    pubnub.addListener(listener);

    return () => {
      pubnub.removeListener(listener);
      pubnub.unsubscribeAll();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    pubnub.publish({
      channel: CHANNEL,
      message: { sender: currentUser, text: input },
    });

    setInput('');
  };

  return (
    <div className=' 2px solid red black ' >
      <h2>Chat with {otherUser}</h2>
      <div className=''>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === currentUser ? 'right' : 'left' }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} >
        Send
      </button>
    </div>
  );
}

export default Chat;
