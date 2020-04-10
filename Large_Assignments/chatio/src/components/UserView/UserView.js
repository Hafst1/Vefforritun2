import React from 'react';
import UserViewItem from '../UserViewItem/UserViewItem';
import { ChatConsumer } from '../../context/ChatContext';

const UserView = () => {
  return (
    <div id="lobby-users">
      <ChatConsumer>
        {
          chatContext => chatContext.users.map((user, i) => <UserViewItem key={i} user={user} />)
        }
      </ChatConsumer>
    </div>
  );
};

export default UserView;