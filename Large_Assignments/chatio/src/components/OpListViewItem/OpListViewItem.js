import React from 'react';
import { socket } from '../../services/socketService';
import PropTypes from 'prop-types';

class OpListViewItem extends React.Component {
  deOp(room) {
    var deopObj = {
      room: room,
      user: this.props.op
    }
    socket.emit('deop', deopObj, (response) => {
      if (response) {
        console.log('de-op user success');
      } else {
        console.log('You do not have permission to do deop user')
      }
    });
  }
  render() {
    return (
      <div>
        <p>{this.props.op}</p>
        <button type="button" className="btn btn-danger btn-sm" onClick={() => this.deOp(this.props.room)}>De-Op</button>
      </div>
    );
  }
}

OpListViewItem.propTypes = {
  // String containing the name of the op, required.
  op: PropTypes.string.isRequired,
  // String containing the name of the room, required.
  room: PropTypes.string.isRequired
}

OpListViewItem.defaultProps = {
  // The name of the op is 'John Doe' on default.
  op: 'John Doe',
  // Room name is 'chatroom' on default.
  room: 'chatroom'
}

export default OpListViewItem;