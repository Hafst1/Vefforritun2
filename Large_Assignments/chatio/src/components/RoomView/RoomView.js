import React from 'react';
import RoomViewItem from '../RoomViewItem/RoomViewItem';

const RoomView = (props) => {
  const {rooms} = props;
  return(
    <div>
      {
        Object.keys(rooms).map((keyName, keyIndex) => <RoomViewItem key={keyIndex} room={rooms[keyName]} name={keyName}/>) 
      }
    </div>
  )
}