import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { socket } from '../../services/socketService';
import RoomView from '../RoomView/RoomView';
import UserView from '../UserView/UserView';

class ChatLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newRoom: {
        roomName: '',
        roomPass: ''
      },
      showModal: false
    };
  }
  createNewRoom(room) {
    if (room.roomName === '') {
      return false;
    }
    const roomObj = {
      room: room.roomName,
      pass: room.roomPass
    }
    if (room.roomPass === '') {
      roomObj.pass = undefined;
    }
    socket.emit('joinroom', roomObj, (response) => {
      if (response === true) {
        socket.emit('rooms');
        this.toggleModal(false);
        this.setState({ ...this.state, newRoom: { roomName: '', roomPass: '' } });
      } else {
        console.log('Did not work');
      }
    });
  };
  toggleModal(input) {
    this.setState({ ...this.state, showModal: input });
  }
  render() {
    const { newRoom, showModal } = this.state;
    return (
      <div id="lobby">
        <div id="lobby-header">
          <h3><strong>Lobby</strong></h3>
        </div>
        <div id="lobby-body">
          <RoomView />
          <div id="lobby-btn-div">
            <button type="button" className="btn btn-success" onClick={() => this.toggleModal(true)} >Create Room</button>
            <Modal visible={showModal} id="lobby-modal">
              <div className="modal-header">
                <h5 className="modal-title">Create New Room</h5>
              </div>
              <div className="modal-body">
                <label className="control-label" htmlFor="room-name">Room Name:</label>
                <input type="text" name="name-of-room" id="room-name" className="form-control" value={newRoom.roomName}
                  onChange={e => this.setState({ ...this.state, newRoom: { roomName: e.target.value, roomPass: newRoom.roomPass } })} />
                <label className="control-label" htmlFor="room-pass">Room Password (Optional):</label>
                <input type="password" name="pass-of-room" id="room-pass" className="form-control" value={newRoom.roomPass}
                  onChange={e => this.setState({ ...this.state, newRoom: { roomName: newRoom.roomName, roomPass: e.target.value } })} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => this.toggleModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={() => this.createNewRoom(newRoom)}>Submit</button>
              </div>
            </Modal>
          </div>
          <div id="lobby-users-list">
            <UserView />
          </div>
        </div>
      </div>
    )
  }
};

export default ChatLobby;