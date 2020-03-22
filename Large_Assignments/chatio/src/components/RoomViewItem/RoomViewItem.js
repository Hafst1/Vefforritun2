import React from 'react';
import { socket } from '../../service/socketService';
import Modal from 'react-bootstrap4-modal';
import { Redirect } from 'react-router-dom';

class RoomViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      redirect: false,
      showModal: false
    }
  }
  toggleModal(input) {
    if (input === true) {
      this.setState({...this.state, showModal: true});
    } else {
      this.setState({...this.state, showModal: false});
    }
  }
  privateRoom(privacy) {
    if (privacy) {
      return 'Private';
    } else {
      return 'Public';
    }
  }
  accessRoom(privacy) {
    if (privacy) {
      this.toggleModal(true);
    } else {
      this.accessRoom('', false);
    }
  }
  enterRoom(password, privacy) {
    const roomObjects = {
      room: this.props.name,
      pass: undefined
    }
    if (privacy) {
      if (password = '') {
        return false;
      }
      roomObjects.pass = password;
    }
    socket.emit('joinroom', roomObj, (response) => {
      if (response === true) {
        socket.emit('rooms');
        this.setState({redirect: true});
        this.toggleModal(false);
      } else {
        console.log('Something went wrong!');
      }
    });
    this.setState({...this.state, password: ''});
  }
  renderRedirect = () => {
    if (this.state.redirect === true) {
      return <Redirect to={{pathname: '/chatroom', state: this.props}} />
    }
  }
  render() {
    const {name, room} = this.props;
    const {password, showModal} = this.state;
    return (
      <div>
        <h3>{name}</h3>
        <p>Number of users in the room: {Object.keys(room.users).length}</p>
        <p>{this.privateRoom(room.locked)}</p>
        <button type="button" className="btn btn-success" onClick={() => this.accessRoom(room.locked)}>Join chat</button>
        <Modal visible={showModal}>
          <div className="modal-head">
            <h4 className="modal-title">Enter the password</h4>
          </div>
          <div className="modal-body">
            <label htmlFor="password" className="control-label">Password</label>
            <input type="text" name="" id={`password-${name}`} className="form-control" 
            value={password} onChange={e => this.setState({...this.state, password: e.target.value})} />
          </div>
          <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={() => this.toggleModal(false)}>Cancel</button>
          {this.renderRedirect()}
          <button type="button" className="btn btn-primary" onClick={() => this.enterRoom(password, true)}>Submit</button>
        </div>
        </Modal>
      </div>
    )
  }
}

export default RoomViewItem;