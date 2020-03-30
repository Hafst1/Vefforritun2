import React from "react";
import { socket } from "../../service/socketService";
import Modal from 'react-bootstrap4-modal';
import { Redirect } from 'react-router-dom';
import OpListView from '../OpListView/OpListView'
import BanListView from '../BanListView/BanListView';
import UsersInChatView from '../UsersInChatView/UsersInChatView';

class ChatWindow extends React.Component {
  componentDidMount() {
    socket.on('updateusers', (room, roomUsers, roomOps) => {
      if (room === this.props.match.params.roomName)
        this.setState({ ...this.state, room: { ...this.state.room, users: roomUsers, ops: roomOps } });
    });
    socket.on('updatechat', (room, roomMessageHistory) => {
      if (room === this.props.match.params.roomName) {
        this.setState({ ...this.state, room: { ...this.state.room, messageHistory: this._editMessageHistory(roomMessageHistory) } });
      }
    });
    socket.on('servermessage', (event, roomName, userName) => {
      const { room } = this.state;
      if (roomName === this.props.match.params.roomName || event === 'quit') {
        this.setState({ ...this.state, room: { ...room, messageHistory: [...room.messageHistory, this._editServerMessage(event, roomName, userName)] } });
      }
    });
    socket.on('updatetopic', (roomName, topic, userName, topicUpdated) => {
      const { room } = this.state;
      if (roomName === this.props.match.params.roomName) {
        if (topicUpdated) {
          this.setState({ ...this.state, room: { ...room, topic: topic, messageHistory: [...room.messageHistory, this._editTopicMessage(userName, topic, roomName)] } });
        }
        else {
          this.setState({ ...this.state, room: { ...room, topic: topic } });
        }
      }
    });
    socket.on('banned', (roomName, bannedUser, userName, newBannedList) => {
      const { room } = this.state;
      if (roomName === this.props.match.params.roomName) {
        this.setState({
          ...this.state, room: {
            ...room, banned: newBannedList,
            messageHistory: [...room.messageHistory, this._editBanKickMessage(userName, "banned", bannedUser, roomName)],
            users: this._filterOutUser(room.users, bannedUser)
          }
        });
      }
    });
    socket.on('unbanned', (roomName, unbannedUser, userName, updatedBannedList) => {
      const { room } = this.state;
      if (roomName === this.props.match.params.roomName) {
        this.setState({
          ...this.state, room: {
            ...room, banned: updatedBannedList,
            messageHistory: [...room.messageHistory, this._editOpMessage(userName, "un-banned", unbannedUser, roomName)]
          }
        });
      }
    });
    socket.on('deopped', (roomName, deOppedUser, userName) => {
      const { room } = this.state;
      if (roomName === this.props.match.params.roomName) {
        this.setState({ ...this.state, room: { ...room, messageHistory: [...room.messageHistory, this._editOpMessage(userName, "de-opped", deOppedUser, roomName)] } });
      }
    });
    socket.on('opped', (roomName, oppedUser, userName) => {
      const { room } = this.state;
      if (roomName === this.props.match.params.roomName) {
        this.setState({ ...this.state, room: { ...room, messageHistory: [...room.messageHistory, this._editOpMessage(userName, "opped", oppedUser, roomName)] } });
      }
    });
    socket.on('kicked', (roomName, kickedUser, userName) => {
      const { room } = this.state;
      if (roomName === this.props.match.params.roomName) {
        this.setState({ ...this.state, room: { ...room, messageHistory: [...room.messageHistory, this._editBanKickMessage(userName, "kicked", kickedUser, roomName)] } });
      }
    });
    socket.on('gotBanned', roomName => {
      if (roomName === this.props.match.params.roomName) {
        this.leaveRoom('banned');
      }
    });
    socket.on('gotKicked', roomName => {
      if (roomName === this.props.match.params.roomName) {
        this.leaveRoom('kicked');
      }
    });
  }
  _editMessageHistory(messageHistory) {
    return messageHistory.map(m => `${m.timestamp} - ${m.nick} - ${m.message}`);
  }
  _editTopicMessage(userName, topic, roomName) {
    return `${userName} set the topic to '${topic}' in ${roomName}`;
  }
  _editBanKickMessage(userName, action, bannedUser, roomName) {
    if (userName === bannedUser) {
      return `${userName} ${action} himself/herself from ${roomName}`;
    }
    else {
      return `${userName} ${action} ${bannedUser} from ${roomName}`;
    }
  }
  _editOpMessage(userName, action, deOppedUser, roomName) {
    if (userName === deOppedUser) {
      return `${userName} ${action} himself/herself in ${roomName}`;
    }
    else {
      return `${userName} ${action} ${deOppedUser} in ${roomName}`;
    }
  }
  _filterOutUser(users, bannedUser) {
    var usersObj = users;
    delete usersObj[bannedUser];
    return users;
  }
  _editServerMessage(event, room, userName) {
    if (event === 'quit') {
      return `${userName} has disconnected from the server`;
    }
    else {
      if (room === this.props.match.params.roomName) {
        if (event === 'join') {
          return `${userName} has joined the chatroom`;
        }
        else if (event === 'part') {
          return `${userName} has left the chatroom`;
        }
      }
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      room: {
        users: {},
        ops: {},
        banned: {},
        messageHistory: [],
        topic: "No topics has been set for room..",
        password: '',
        locked: false
      },
      message: '',
      newTopic: '',
      newPassword: '',
      topicModal: false,
      passwordModal: false,
      redirect: false
    };
  }
  sendMessage(message) {
    if (message === '') { return false; }
    var msgObj = {
      roomName: this.props.match.params.roomName,
      msg: message
    }
    socket.emit('sendmsg', msgObj);
    this.setState({ ...this.state, message: '' });
  }
  leaveRoom(reason) {
    if (reason === 'leave') {
      socket.emit('partroom', this.props.match.params.roomName);
    }
    socket.emit('rooms');
    this.setState({ ...this.state, redirect: true });
  }
  changeTopic(newTopic) {
    if (newTopic === '') { return false; }
    var topicObj = {
      room: this.props.match.params.roomName,
      topic: newTopic
    }
    socket.emit('settopic', topicObj, (resp) => {
      if (resp) {
        socket.emit('rooms');
        this.toggleModal(false, 'topicModal');
      }
      else {
        console.log('You need to be an op to change topic');
      }
    });
    this.setState({ ...this.state, newTopic: '' });
  }
  changePassword(newPassword) {
    if (newPassword === '') { return false; }
    var passwordObj = {
      room: this.props.match.params.roomName,
      password: newPassword
    }
    socket.emit('setpassword', passwordObj, (resp) => {
      if (resp) {
        socket.emit('rooms');
        this.toggleModal(false, 'passwordModal');
      }
      else {
        console.log('You need to be an op to change password');
      }
    });
    this.setState({ ...this.state, newPassword: '' });
  }
  unlockRoom() {
    var remObj = {
      room: this.props.match.params.roomName
    }
    socket.emit('removepassword', remObj, (resp) => {
      if (resp) {
        socket.emit('rooms');
      }
      else {
        console.log('You need to be an op to unlock chat');
      }
    })
  }
  renderRedirect() {
    if (this.state.redirect === true) {
      return <Redirect exact to={{ pathname: '/lobby' }} />
    }
  }
  toggleModal(inp, whichModal) {
    if (whichModal === "topicModal") {
      this.setState({ ...this.state, topicModal: inp });
    }
    else {
      this.setState({ ...this.state, passwordModal: inp });
    }
  }
  componentWillUnmount() {
    socket.removeListener('updateusers');
    socket.removeListener('updatechat');
    socket.removeListener('servermessage');
    socket.removeListener('updatetopic');
    socket.removeListener('banned');
    socket.removeListener('unbanned');
    socket.removeListener('deopped');
    socket.removeListener('opped');
    socket.removeListener('kicked');
    socket.removeListener('gotBanned');
    socket.removeListener('gotKicked');
  }
  render() {
    const { room, message, newTopic, newPassword, topicModal, passwordModal } = this.state;
    return (
      <div id="chatroom">
        <div id="buttons-list">
          <button type="button" className="btn btn-danger" onClick={() => this.leaveRoom('leave')}>LEAVE ROOM</button>
          <button type="button" className="btn btn-success" onClick={() => this.toggleModal(true, 'topicModal')}>CHANGE TOPIC</button>
          <button type="button" className="btn btn-success" onClick={() => this.toggleModal(true, 'passwordModal')}>CHANGE PASSWORD</button>
          <button type="button" className="btn btn-success" onClick={() => this.unlockRoom()}>UNLOCK ROOM</button>
          {this.renderRedirect()}
        </div>
        <div className="group-chat-window">
          <div className="chat-window-header">
            <h3><strong>{this.props.match.params.roomName}</strong></h3>
          </div>
          <div className="chat-window-body">
            <div className="chat-window-msg-inp">
              <div className="chat-window-messages">
                <ChatWindow.Messages messages={room.messageHistory} />
              </div>
              <div className="chat-window-input">
                <div className="input-group">
                  <input type="text" value={message} onChange={e => this.setState({ message: e.target.value })}
                    placeholder="ENTER YOUR MESSAGE HERE..." />
                  <button type="button" className="btn btn-primary" onClick={() => this.sendMessage(message)}>SEND</button>
                </div>
              </div>
            </div>
            <div className="chat-window-users">
              <UsersInChatView users={room.users} room={this.props.match.params.roomName} />
            </div>
          </div>
        </div>
        <div id="ops-ban-list-view">
          <div id="ops-list">
            <OpListView ops={room.ops} room={this.props.match.params.roomName} />
          </div>
          <div id="ban-list">
            <BanListView banned={room.banned} room={this.props.match.params.roomName} />
          </div>
        </div>
        <Modal visible={topicModal} id="topic-modal">
          <div className="modal-header">
            <h5 className="modal-title">CHANGE TOPIC</h5>
          </div>
          <div className="modal-body">
            <label className="control-label" htmlFor="password">NEW TOPIC:</label>
            <input type="text" name="change-topic" id="change-topic" className="form-control" value={newTopic} onChange={e => this.setState({ newTopic: e.target.value })} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => this.toggleModal(false, 'topicModal')}>
              CANCEL
                    </button>
            <button type="button" className="btn btn-primary" onClick={() => this.changeTopic(newTopic)}>
              SUBMIT
                    </button>
          </div>
        </Modal>
        <Modal visible={passwordModal} id="password-modal">
          <div className="modal-header">
            <h5 className="modal-title">CHANGE PASSWORD</h5>
          </div>
          <div className="modal-body">
            <label className="control-label" htmlFor="password">NEW PASSWORD:</label>
            <input type="password" name="change-password" id="change-password" className="form-control" value={newPassword} onChange={e => this.setState({ newPassword: e.target.value })} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => this.toggleModal(false, 'passwordModal')}>
              CANCEL
                    </button>
            <button type="button" className="btn btn-primary" onClick={() => this.changePassword(newPassword)}>
              SUBMIT
                    </button>
          </div>
        </Modal>
      </div>
    );
  }
};

// ChatWindow.Title = () => (
//     <h3>
//         <strong>CHATIO</strong>
//         {/* <span className="first">C</span>
//         <span className="second">h</span>
//         <span className="third">a</span>
//         <span className="fourth">t</span>
//         <span className="fifth">.</span>
//         <span className="sixth">i</span>
//         <span className="seventh">o</span> */}
//     </h3>
// );

ChatWindow.Messages = props => (
  <div className="chat-window-message-cont">
    {props.messages.map((m, i) => <div key={i} className="message">{m}</div>)}
  </div>
);

// ChatWindow.Users = props => (
//     <div className="users">
//         {Object.keys(props.users).map((keyName, keyIndex) => <div key={keyIndex} className="user">{props.users[keyName]}</div>)}
//     </div>
// );

export default ChatWindow;