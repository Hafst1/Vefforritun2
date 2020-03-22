import React from 'react'
import { socket } from '../../service/socketService';
import Modal from 'react-bootstrap4-modal';

class ChatLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        newRoom: {
            roomName: '',
            roomPass: ''
        },
        showModal: false,
    };
  }
  createRoom(room) {
    if(room.roomName === '' || room.roomPass === '') {
      return false;
    }
    const roomObject = {
      room: room.roomName,
      pass: room.roomPass
    }
    socket.emit('joinroom', roomObject, (respsonse => {
      if(response === true) {
        socket.emit('rooms');
        this.toggleModal(false);
        this.setState({...this.state, newRoom: { roomName: '', roomPass: ''}})
      } else {
        console.log('Something went wrong!');
      }
    }))
  };
  toggleModal(input) {
    if (input === true) {
        this.setState({ ...this.state, showModal: true });
    }
    else {
        this.setState({ ...this.state, showModal: false });
    }
  }
  render() {
    const {newRoom, showModal} = this.state;
    console.log(newRoom);
    return(
      <div>
        <button type="button" className="btn btn-success" onClick={() => this.toggleModal(true)}>Create a room</button>
        <Modal visible={this.state.showModal} id="modal-lobby" >
          <div className="modal-head">
            <h4 className="modal-title">Create a new room</h4>
          </div>
          <div className="modal-body">
            <label className="control-label" htmlFor="room-name">Room Name</label>
            <input type="text" className="form-control" id="room-name" value={this.state.newRoom.roomName} onChange={e => 
            this.setState({...this.state, newRoom: {roomName: e.target.value, roomPass: this.state.newRoom.roomPass}})} />
            <label className="control-label" htmlFor="room-name">Room password:</label>
            <input type="text" className="form-control" id="room-pass" value={ this.state.newRoom.roomPass } onChange={e =>
            this.setState({ ...this.state, newRoom: { roomName: this.state.newRoom.roomName, roomPass: e.target.value } })} />
            {console.log(this.state.newRoom.roomName)}
            {console.log(this.state.newRoom.roomPass)}
          </div>
          <div className="modal-foot">
            <button type="button" className="btn btn-secondary" onClick={() => this.toggleModal(false)}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={() => this.createRoom(this.state.newRoom)}>Submit</button> 
          </div>
        </Modal>
      </div>
    )
  }
}

export default ChatLobby;
