import React, { useEffect, useState } from 'react';
import { usePubNub } from 'pubnub-react';
import PropTypes from 'prop-types';

function Chat({otherUser }) {
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
    <div >
      Chat with {otherUser}
      <div className=' bg-violet-200 min-h-[20vh] w-[70vw] m-5 rounded-md p-5 max-h-[70vh] overflow-y-auto whitespace-normal break-words' >
        {messages.length===0 && <div className='flex items-center hover:font-bold  justify-center'>No message...</div>}
        {messages.map((msg, idx) => (
          <div key={idx}  style={{ textAlign: msg.sender === currentUser ? 'right' : 'left' }}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className='bg-violet-200 hover:bg-violet-400 p-2 m-5 min-w-[50vw] rounded-md'
        />
        <button onClick={sendMessage} className='bg-violet-200 hover:bg-red-400 m-5 pl-3 pr-3 pt-1 pb-1 rounded-full cursor-pointer'>
        Send
        </button>
      </div>
    </div>
  );
}

Chat.propTypes = {
  otherUser: PropTypes.string.isRequired,
};

export default Chat;
