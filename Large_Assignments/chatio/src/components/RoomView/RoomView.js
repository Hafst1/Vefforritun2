import React from 'react';
import RoomViewItem from '../RoomViewItem/RoomViewItem';
import { ChatConsumer } from '../../context/ChatContext';

const RoomView = () => {
  return (
    <div id="room-view">
      <ChatConsumer>
        {
          chatContext => Object.keys(chatContext.rooms).map((keyName, keyIndex) => <RoomViewItem key={keyIndex} room={chatContext.rooms[keyName]} name={keyName} />)
        }
      </ChatConsumer>
    </div>
  );
};

export default RoomView;