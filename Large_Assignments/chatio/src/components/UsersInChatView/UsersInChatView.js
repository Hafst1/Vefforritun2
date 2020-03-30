import React from 'react';
import UsersInChatViewItem from '../UsersInChatViewItem/UsersInChatViewItem';
import PropTypes from 'prop-types';

const UsersInChatView = (props) => {
  return (
    <div className="users">
      {
        Object.keys(props.users).map((keyName, keyIndex) => <UsersInChatViewItem key={keyIndex} user={props.users[keyName]} room={props.room} />)
      }
    </div>
  );
}

UsersInChatView.propTypes = {
  // Object containing the users of the room, required.
  users: PropTypes.object.isRequired,
  // String containing the name of the room, required.
  room: PropTypes.string.isRequired
}

UsersInChatView.defaultProps = {
  // Object contains no users by default.
  users: {},
  // Name of the room is 'chatroom' on default.
  room: 'chatroom'
}


export default UsersInChatView;