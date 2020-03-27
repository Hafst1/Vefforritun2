import React from "react";
import { socket } from "../../service/socketService";
import Modal from 'react-bootstrap4-modal';
import { Redirect } from 'react-router-dom';

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
          this.setState({ ...this.state, room: { ...this.state.room, messageHistory: [...room.messageHistory, this._editServermessage(event, roomName, userName)] } });
      });
      socket.on('updatetopic', (room, topic, username, topicUpdated) => {
          if (room === this.props.match.params.roomName) {
              this.setState({ ...this.state, room: { ...this.state.room, topic: topic } });
          }
      });
      socket.on('banned', (roomName, bannedUser, userName) => {
          const { room } = this.state;
          if (roomName === this.props.match.params.roomName) {
              this.setState({ ...this.state, room: { ...this.state.room, banned: { ...room.banned, bannedUser } } });
          }
      });
  }
  _editMessageHistory(messageHistory) {
      return messageHistory.map(m => `${m.timestamp} - ${m.nick} - ${m.message}`);
  }
  _editServermessage(event, room, userName) {
      if (event === 'quit') {
          if (this.props.match.params.roomName in room) {
              return `${userName} has disconnected from the server`;
          }
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
      this.setState({ message: '' });
  }
  leaveRoom() {
      socket.emit('partroom', this.props.match.params.roomName);
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
  render() {
      const { room, message, newTopic, newPassword, topicModal, passwordModal } = this.state;
      return (
          <div>
              <button type="button" className="btn btn-danger" onClick={() => this.leaveRoom()}>Leave room</button>
              <button type="button" className="btn btn-success" onClick={() => this.toggleModal(true, 'topicModal')}>Change topic</button>
              <button type="button" className="btn btn-success" onClick={() => this.toggleModal(true, 'passwordModal')}>Change password</button>
              {this.renderRedirect()}
              <div id="chat-window">
              <div id="chat-window-header">
                  <h3><strong>{this.props.match.params.roomName}</strong></h3>
              </div>
              <div id="chat-window-body">
                  <div id="chat-window-msg-inp">
                      <div id="chat-window-messages">
                          <ChatWindow.Messages messages={room.messageHistory} />
                      </div>
                      <div id="chat-window-input">
                          <div className="input-group">
                          <input type="text" value={message} onChange={e => this.setState({ message: e.target.value })}
                              placeholder="ENTER YOUR MESSAGE HERE..." />
                          <button type="button" className="btn btn-primary" onClick={() => this.sendMessage(message)}>SEND</button>
                          </div>
                      </div>
                  </div>
                  <div id="chat-window-users">
                      <ChatWindow.Users users={room.users} />
                  </div>
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
                      <input type="text" name="change-password" id="change-password" className="form-control" value={newPassword} onChange={e => this.setState({ newPassword: e.target.value })} />
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
  <div id="chat-window-message-cont">
      {props.messages.map((m, i) => <div key={i} className="message">{m}</div>)}
  </div>
);

ChatWindow.Users = props => (
  <div className="users">
      {Object.keys(props.users).map((keyName, keyIndex) => <div key={keyIndex} className="user">{props.users[keyName]}</div>)}
  </div>
);


export default ChatWindow;
