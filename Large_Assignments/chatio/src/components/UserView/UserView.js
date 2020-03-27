import React from 'react'
import { ChatConsumer } from '../../context/ChatContext'
import UserViewItem from '../UserViewItem/UserViewItem'

const UserView = () => {
  return (
    <div id="lobby-users" >
      <ChatConsumer>
        {
          chatContext => chatContext.users.map((user, i) => <UserViewItem key={i} user={user} />)
        }
      </ChatConsumer>
    </div>
  )
}

export default UserView;