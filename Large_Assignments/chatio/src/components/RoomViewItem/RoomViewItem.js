import React from 'react';
import { socket } from '../../service/socketService';
import Modal from 'react-bootstrap4-modal';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class RoomViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      showModal: false,
      redirect: false
    };
  }
  toggleModal(inp) {
    if (inp === true) {
      this.setState({ ...this.state, showModal: true });
    } else {
      this.setState({ ...this.state, showModal: false });
    }
  }
  roomPrivacy(priv) {
    if (priv) {
      return 'Private';
    } else {
      return 'Public';
    }
  }
  tryEnterRoom(priv) {
    if (priv) {
      this.toggleModal(true);
    } else {
      this.enterRoom('', false);
    }
  }
  enterRoom(password, priv) {
    const roomObj = {
      room: this.props.name,
      pass: undefined
    }
    if (priv) {
      if (password === '') { return false; }
      roomObj.pass = password;
    }
    socket.emit('joinroom', roomObj, (resp, reason) => {
      if (resp === true) {
        socket.emit('rooms');
        this.toggleModal(false);
        this.setState({ redirect: true })
      } else {
        console.log('Access denied - Reason: ' + reason);
      }
    });
    this.setState({ ...this.state, password: '' });
  }
  renderRedirect = () => {
    if (this.state.redirect === true) {
      return <Redirect to={{ pathname: '/chatroom', state: this.props }} />
    }
  }
  render() {
    const { room, name } = this.props;
    const { password, showModal } = this.state;
    return (
      <div className="room-view-item">
        <h3 ><strong>{name}</strong></h3>
        <p>Users in room: {Object.keys(room.users).length}</p>
        <p>Topic: {room.topic}</p>
        <p>{this.roomPrivacy(room.locked)}</p>
        <button type="button" className="btn btn-success" onClick={() => this.tryEnterRoom(room.locked)} >Join Room</button>
        <Modal visible={showModal}>
          <div className="modal-header">
            <h5 className="modal-title">Enter password</h5>
          </div>
          <div className="modal-body">
            <label className="control-label" htmlFor="password">PASSWORD:</label>
            <input type="text" name={name} id={`password-${name}`} className="form-control" value={password}
              onChange={e => this.setState({ ...this.state, password: e.target.value })} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => this.toggleModal(false)}>
              Cancel
              </button>
            {this.renderRedirect()}
            <button type="button" className="btn btn-primary" onClick={() => this.enterRoom(password, true)}>
              Submit
              </button>
          </div>
        </Modal>
      </div>
    );
  }
};

RoomViewItem.propTypes = {
  // The room provided as props, required.
  room: PropTypes.shape({
      // Object containing users of the room, required.
      users: PropTypes.object.isRequired,
      // Object containg ops of the room, required.
      ops: PropTypes.object.isRequired,
      // Object containg banned members of the room, required.
      banned: PropTypes.object.isRequired,
      // Array containing the message history of the room, required.
      messageHistory: PropTypes.array.isRequired,
      // String containing the topic of the room, required.
      topic: PropTypes.string.isRequired,
      // Bool value containg true or false whether the room is locked or not, required.
      locked: PropTypes.bool.isRequired,
      // String containing the password of the room, required.
      password: PropTypes.string.isRequired
  }).isRequired,
  // The name of the room provided as props.
  name: PropTypes.string.isRequired
}

RoomViewItem.defaultProps = {
  room: {
      // Room has no users on default
      users: {},
      // Room has no ops on default.
      ops: {},
      // Room has no banned members on default.
      banned: {},
      // Room has no messageHistory on default.
      messageHistory: [],
      // Room has following topic as default.
      topic: 'No topic has been set for room...',
      // Room is not locked on default.
      locked: false,
      // Password is an empty string on default.
      password: ''
  },
  // Room name is 'chatroom' on default.
  name: 'chatroom'
}

export default RoomViewItem;