import React from 'react';
import { socket } from '../../service/socketService';
import PropTypes from 'prop-types';

class UsersInChatViewItem extends React.Component {
  opUser(room) {
    var opObj = {
      room: room,
      user: this.props.user
    }
    socket.emit('op', opObj, (resp) => {
      if (resp) {
        console.log('op user succes')
      } else {
        console.log('You do not have permission to do op user')
      }
    });
  }
  kickUser(room) {
    var kickObj = {
      room: room,
      user: this.props.user
    }
    socket.emit('kick', kickObj, (resp) => {
      if (resp) {
        console.log('kick user succes')
      } else {
        console.log('You do not have permission to do kick user')
      }
    });
  }
  banUser(room) {
    var banObj = {
      room: room,
      user: this.props.user
    }
    socket.emit('ban', banObj, (resp) => {
      if (resp) {
        console.log('ban user succes')
      } else {
        console.log('You do not have permission to do ban user')
      }
    });
  }
  render() {
    return (
      <div className="user">
        <p>{this.props.user}</p>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => this.opUser(this.props.room)}>OP</button>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => this.kickUser(this.props.room)}>KICK</button>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => this.banUser(this.props.room)}>BAN</button>
      </div>
    );
  }
}

UsersInChatViewItem.propTypes = {
  // String containing the name of a user, required.
  user: PropTypes.string.isRequired,
  // String containing the name of the room, required.
  room: PropTypes.string.isRequired
}

UsersInChatViewItem.defaultProps = {
  // The name of the user is 'John Doe' on default.
  user: 'John Doe',
  // Name of the room is 'chatroom' on default.
  room: 'chatroom'
}


export default UsersInChatViewItem;