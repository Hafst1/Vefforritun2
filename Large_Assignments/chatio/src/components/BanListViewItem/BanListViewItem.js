import React from 'react';
import { socket } from '../../services/socketService';
import PropTypes from 'prop-types';

class BanListViewItem extends React.Component {
  unBan(room) {
    var unbanObj = {
      room: room,
      user: this.props.banned
    }
    socket.emit('unban', unbanObj, (response) => {
      if (response) {
        console.log('un-ban user success');
      } else {
        console.log('You do not have permission to do unban user')
      }
    });
  }
  render() {
    return (
      <div>
        <p>{this.props.banned}</p>
        <button type="button" className="btn btn-success btn-sm" onClick={() => this.unBan(this.props.room)}>Un-Ban</button>
      </div>
    );
  }
}

BanListViewItem.propTypes = {
  // String containing the name of a banned user, required.
  banned: PropTypes.string.isRequired,
  // String containing the name of the room, required.
  room: PropTypes.string.isRequired
}

BanListViewItem.defaultProps = {
  // The name of the banned user is 'John Doe' on default.
  banned: 'John Doe',
  // Room name is 'chatroom' on default.
  room: 'chatrooom'
}

export default BanListViewItem;